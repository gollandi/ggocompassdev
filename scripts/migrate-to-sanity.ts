/**
 * Migration script to convert existing recoveryData.ts to Sanity documents
 *
 * Usage:
 * 1. Set up your Sanity project and add credentials to .env
 * 2. Run: npx ts-node scripts/migrate-to-sanity.ts
 *
 * This script will:
 * - Upsert default locations (Chelsea, Highgate) if missing
 * - Create/update procedures from existing data
 * - Link procedures to availableLocations (references)
 * - Create recovery day documents for each procedure
 */

import { sanityAdminClient } from '../src/lib/sanity/client';
import { procedureRecoveryData, ProcedureType } from '../src/data/recoveryData';

interface SanityDocument {
  _type: string;
  [key: string]: any;
}

async function upsertLocation(name: string, slugCurrent: string) {
  const existing = await sanityAdminClient.fetch(
    `*[_type == "ggoLocation" && slug.current == $slug][0]{ _id }`,
    { slug: slugCurrent }
  );

  if (existing?._id) return existing._id as string;

  const created = await sanityAdminClient.create({
    _type: 'ggoLocation',
    name,
    slug: { _type: 'slug', current: slugCurrent },
    address: {
      street: 'TBC',
      city: 'London',
      postcode: 'TBC',
      country: 'United Kingdom',
    },
    contacts: {
      main: { phone: 'TBC' },
    },
    isActive: true,
    displayOrder: slugCurrent === 'chelsea' ? 1 : 2,
  });

  return created._id as string;
}

async function migrateProcedures() {
  console.log('Starting migration to Sanity...\n');

  // Upsert common default locations
  console.log('Step 0: Upserting default locations (Chelsea, Highgate)...');
  const chelseaId = await upsertLocation('Chelsea', 'chelsea');
  const highgateId = await upsertLocation('Highgate', 'highgate');
  const defaultLocationIds = [chelseaId, highgateId];

  const procedures = Object.keys(procedureRecoveryData) as ProcedureType[];
  const createdProcedures: { [key: string]: string } = {};

  // Step 1: Create or update procedures, link availableLocations
  console.log('Step 1: Creating procedures...');
  for (const procedureName of procedures) {
    const recoveryDays = procedureRecoveryData[procedureName];
    if (!recoveryDays || recoveryDays.length === 0) {
      console.log(`⚠️  Skipping ${procedureName} - no recovery days found`);
      continue;
    }

    const slug = procedureName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Find or create the procedure
    const existing = await sanityAdminClient.fetch(
      `*[_type == "ggoProcedure" && slug.current == $slug][0]{ _id }`,
      { slug }
    );

    const procedureDoc: SanityDocument = {
      _type: 'ggoProcedure',
      name: procedureName,
      slug: { _type: 'slug', current: slug },
      description: `Recovery guidance for ${procedureName}`,
      totalRecoveryDays: recoveryDays.length - 1,
      isActive: true,
      displayOrder: 999,
      availableLocations: defaultLocationIds.map((id) => ({ _type: 'reference', _ref: id })),
    };

    let procedureId: string;
    try {
      if (existing?._id) {
        const patched = await sanityAdminClient
          .patch(existing._id)
          .set(procedureDoc)
          .commit();
        procedureId = patched._id;
        console.log(`✓ Updated procedure: ${procedureName} (${procedureId})`);
      } else {
        const created = await sanityAdminClient.create(procedureDoc);
        procedureId = created._id;
        console.log(`✓ Created procedure: ${procedureName} (${procedureId})`);
      }
      createdProcedures[procedureName] = procedureId;
    } catch (error: any) {
      console.error(`✗ Failed to upsert procedure ${procedureName}:`, error.message);
      continue;
    }
  }

  console.log(`\nUpserted ${Object.keys(createdProcedures).length} procedures\n`);

  // Step 2: Create recovery days
  console.log('Step 2: Creating recovery days...');
  let totalDaysCreated = 0;

  for (const procedureName of procedures) {
    const recoveryDays = procedureRecoveryData[procedureName];
    const procedureId = createdProcedures[procedureName];

    if (!recoveryDays || !procedureId) continue;

    console.log(`\nCreating ${recoveryDays.length} days for ${procedureName}...`);

    for (const day of recoveryDays) {
      let phase = 'early';
      let phaseLabel = 'Early Recovery';
      if (day.day === 0) { phase = 'surgery'; phaseLabel = 'Surgery Day'; }
      else if (day.day >= 1 && day.day <= 7) { phase = 'early'; phaseLabel = 'Early Recovery'; }
      else if (day.day >= 8 && day.day <= 14) { phase = 'healing'; phaseLabel = 'Active Healing'; }
      else if (day.day >= 15 && day.day <= 21) { phase = 'strengthening'; phaseLabel = 'Strengthening'; }
      else { phase = 'final'; phaseLabel = 'Final Phase'; }

      const recoveryDayDoc: SanityDocument = {
        _type: 'ggoRecoveryDay',
        dayNumber: day.day,
        procedure: { _type: 'reference', _ref: procedureId },
        phase,
        phaseLabel,
        title: day.title,
        normalExperiences: [
          { _type: 'block', _key: `block-${day.day}`, style: 'normal', children: [{ _type: 'span', text: day.reassurance }] },
        ],
        forecast: [
          { _type: 'block', _key: `forecast-${day.day}`, style: 'normal', children: [{ _type: 'span', text: day.forecast }] },
        ],
        redFlags: day.redFlags,
        nurseNote: day.nurseNote || null,
        nurseName: day.nurseName || null,
        whyThisHappens: day.whyThisHappens || null,
      };

      try {
        await sanityAdminClient.create(recoveryDayDoc);
        totalDaysCreated++;
        process.stdout.write('.');
      } catch (error: any) {
        console.error(`\n✗ Failed to create day ${day.day}:`, error.message);
      }
    }
  }

  console.log(`\n\n✓ Migration complete!`);
  console.log(`  Procedures upserted: ${Object.keys(createdProcedures).length}`);
  console.log(`  Recovery days created: ${totalDaysCreated}`);
  console.log(`\nView content in Sanity Studio at /studio`);
}

migrateProcedures()
  .then(() => { console.log('\n✓ Migration successful!'); process.exit(0); })
  .catch((error) => { console.error('\n✗ Migration failed:', error); process.exit(1); });
