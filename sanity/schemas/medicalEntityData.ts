import { defineField, defineType } from 'sanity'

export const medicalInterventionEntity = defineType({
  name: 'medicalInterventionEntity',
  title: 'Medical Intervention / Treatment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description:
        'Full clinical name of this intervention or treatment (e.g. "Vasectomy", "Prostate MRI Biopsy").',
      validation: (Rule) =>
        Rule.required().error(
          'A name is required for every medical intervention or treatment.',
        ),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'URL-safe identifier for this intervention. Required for stable cross-referencing and future page generation.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error(
          'A slug is required to uniquely identify this intervention.',
        ),
    }),
    defineField({
      name: 'schemaId',
      title: 'Schema.org ID (stable)',
      type: 'string',
      description:
        'Optional stable ID used in JSON-LD. If empty, it can later be derived from the site URL and slug.',
    }),
    defineField({
      name: 'kind',
      title: 'Intervention Type',
      type: 'string',
      description:
        'The Schema.org subtype for this intervention. Your selection controls which additional fields appear below — for example, "Drug" reveals active ingredient and administration route fields, while procedure types (such as "Surgical Procedure" or "Diagnostic Procedure") reveal body location and typical recovery time fields. Choose the type that most closely matches how this intervention is classified clinically.',
      options: {
        list: [
          { title: 'Surgical Procedure', value: 'surgicalProcedure' },
          { title: 'Diagnostic Procedure', value: 'diagnosticProcedure' },
          { title: 'Medical Therapy', value: 'medicalTherapy' },
          { title: 'Drug', value: 'drug' },
          { title: 'Lifestyle Modification', value: 'lifestyleModification' },
        ],
        layout: 'radio',
      },
      validation: (Rule) =>
        Rule.required().error(
          'Select an intervention type to reveal the relevant fields.',
        ),
    }),
    defineField({
      name: 'codes',
      title: 'Medical Codes',
      type: 'array',
      of: [{ type: 'medicalCode' }],
      description:
        'Structured terminology codes for this intervention (ICD-10, SNOMED CT, OPCS-4, RxNorm, ATC). Add at least one primary code where available.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        'Brief clinical description of this intervention. Used in Schema.org JSON-LD and may appear in structured snippets.',
    }),
    defineField({
      name: 'howPerformed',
      title: 'How Performed',
      type: 'text',
      description:
        'Brief description of how this intervention is performed. Migrated from legacy procedure data where available.',
    }),
    defineField({
      name: 'preparation',
      title: 'Preparation',
      type: 'text',
      description:
        'What patients need to do to prepare. Migrated from legacy procedure data where available.',
    }),
    defineField({
      name: 'followup',
      title: 'Follow-up',
      type: 'text',
      description:
        'Post-intervention follow-up care and monitoring. Migrated from legacy procedure data where available.',
    }),
    defineField({
      name: 'clinicalGuidelines',
      title: 'Clinical Guidelines',
      type: 'array',
      description:
        'Structured guideline references relevant to this intervention (e.g., EAU, NICE, AUA).',
      of: [
        {
          type: 'object',
          name: 'guidelineEntry',
          title: 'Guideline',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description:
                'Name or description of the guideline (e.g., "EAU Guidelines on ...").',
              validation: (Rule) =>
                Rule.required().error('A title is required for each guideline.'),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Link to the official guideline document or page.',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'bodyLocation',
      title: 'Body Location',
      type: 'string',
      description:
        'The anatomical site where this procedure is performed (e.g. "Scrotum", "Urethra"). Use standard anatomical terminology.',
      hidden: ({ document }: any) =>
        !['surgicalProcedure', 'diagnosticProcedure'].includes(document?.kind as string),
    }),
    defineField({
      name: 'recoveryTime',
      title: 'Recovery Time',
      type: 'string',
      description:
        'Expected recovery duration in plain language (e.g. "2–4 weeks", "24 hours day surgery"). Used in Schema.org output.',
      hidden: ({ document }: any) => document?.kind !== 'surgicalProcedure',
    }),
    defineField({
      name: 'activeIngredient',
      title: 'Active Ingredient',
      type: 'string',
      description:
        'International Non-proprietary Name (INN) of the active ingredient (e.g. "Testosterone undecanoate").',
      hidden: ({ document }: any) => document?.kind !== 'drug',
    }),
    defineField({
      name: 'administrationRoute',
      title: 'Route of Administration',
      type: 'string',
      description:
        'How the drug is delivered (e.g. "Oral", "Intramuscular injection", "Topical gel"). Use standard pharmaceutical terminology.',
      hidden: ({ document }: any) => document?.kind !== 'drug',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'kind',
    },
  },
})
