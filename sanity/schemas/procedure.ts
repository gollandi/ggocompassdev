import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ggoProcedure',
  title: 'GGO Procedure',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Procedure Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'availableLocations',
      title: 'Available Locations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'ggoLocation' }],
        },
      ],
      description: 'Locations where this procedure is performed',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'sites',
      title: 'Legacy Sites (Deprecated)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Legacy field - use Available Locations instead',
      hidden: true,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Detailed Content (Page Builder)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'accordionBlock' },
        { type: 'cardBlock' },
        { type: 'videoResourceBlock' }
      ],
      description: 'Rich text content with interactive modules',
    }),
    defineField({
      name: 'totalRecoveryDays',
      title: 'Total Recovery Days',
      type: 'number',
      description: 'Total number of days in the recovery timeline',
      validation: (Rule) => Rule.required().min(0).max(365),
    }),
    defineField({
      name: 'category',
      title: 'Procedure Category',
      type: 'string',
      options: {
        list: [
          { title: 'Urology', value: 'urology' },
          { title: 'General Surgery', value: 'general' },
          { title: 'Orthopedics', value: 'orthopedics' },
          { title: 'Gynecology', value: 'gynecology' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active Procedure',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this procedure is currently offered',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which procedures should be displayed (lower numbers first)',
    }),
    defineField({
      name: 'emergencyContacts',
      title: 'Procedure-Specific Emergency Contacts',
      type: 'object',
      fields: [
        defineField({
          name: 'urgentLine',
          title: 'Urgent Clinical Line',
          type: 'string',
          description: 'Procedure-specific urgent contact number',
        }),
        defineField({
          name: 'consultantTeam',
          title: 'Consultant Team Contact',
          type: 'string',
        }),
        defineField({
          name: 'specialistNurse',
          title: 'Specialist Nurse Contact',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'preOperativeInstructions',
      title: 'Pre-operative Instructions',
      type: 'text',
      rows: 4,
      description: 'Instructions for patients before the procedure',
    }),
    defineField({
      name: 'postOperativeInstructions',
      title: 'Post-operative Instructions',
      type: 'text',
      rows: 4,
      description: 'General instructions for patients after the procedure',
    }),
    defineField({
      name: 'expectedOutcomes',
      title: 'Expected Outcomes',
      type: 'text',
      rows: 3,
      description: 'What patients can expect from this procedure',
    }),
    defineField({
      name: 'commonConcerns',
      title: 'Common Patient Concerns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'concern',
              title: 'Concern',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'response',
              title: 'Response',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'recoveryType',
      title: 'Recovery Type',
      type: 'string',
      options: {
        list: [
          { title: 'Day Case (Home same day)', value: 'day-case' },
          { title: 'Overnight Stay (1 night)', value: 'overnight' },
          { title: 'Extended Stay (2+ nights)', value: 'extended' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoGuide',
      title: 'Procedure Video Guide',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Video Title', type: 'string' }),
        defineField({ name: 'url', title: 'Video URL (Vimeo/YouTube)', type: 'url' }),
        defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image' }),
        defineField({ name: 'duration', title: 'Duration (mins)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'uiCustomization',
      title: 'UI Copies & Microcopy Overrides',
      type: 'object',
      description: 'Override standard app text for this specific procedure. Leave blank to use defaults.',
      fields: [
        defineField({ name: 'welcomeTitle', title: 'Onboarding: Welcome Title', type: 'string' }),
        defineField({ name: 'welcomeBody', title: 'Onboarding: Welcome Body', type: 'text', rows: 3 }),
        defineField({ name: 'recoveryIntroTitle', title: 'Recovery: Intro Title', type: 'string' }),
        defineField({ name: 'recoveryIntroBody', title: 'Recovery: Intro Body', type: 'text', rows: 3 }),
        defineField({ name: 'completionTitle', title: 'Completion: Title', type: 'string' }),
        defineField({ name: 'completionBody', title: 'Completion: Body', type: 'text', rows: 3 }),
        defineField({
          name: 'checklistOverrides',
          title: 'Checklist Item Overrides',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'key', type: 'string', title: 'Key (e.g. "meds_check")' },
                { name: 'text', type: 'string', title: 'Display Text' }
              ]
            }
          ]
        })
      ],
    }),
    defineField({
      name: 'governance',
      title: 'Clinical Governance & Compliance',
      type: 'object',
      description: 'Metadata for regulatory compliance and audit trails',
      fields: [
        defineField({
          name: 'dataSource',
          title: 'Data Source',
          type: 'string',
          description: 'Clinical guidelines or standards used (e.g., "BAUS/NICE NG128 2024")',
          placeholder: 'BAUS/NICE NG128 2024',
        }),
        defineField({
          name: 'lastReviewed',
          title: 'Last Reviewed Date',
          type: 'date',
          description: 'Date content was last clinically reviewed',
        }),
        defineField({
          name: 'nextReviewDue',
          title: 'Next Review Due',
          type: 'date',
          description: 'When content should be reviewed again',
        }),
        defineField({
          name: 'author',
          title: 'Content Author',
          type: 'string',
          description: 'Person/team who created content',
          placeholder: 'GGO Med Clinical Team',
        }),
        defineField({
          name: 'reviewer',
          title: 'Clinical Reviewer',
          type: 'string',
          description: 'Qualified reviewer who approved content',
          placeholder: 'FRCS Urol Governance Lead',
        }),
        defineField({
          name: 'version',
          title: 'Content Version',
          type: 'string',
          description: 'Version number for change tracking',
          placeholder: '1.0.0',
        }),
        defineField({
          name: 'readingLevel',
          title: 'Reading Level',
          type: 'string',
          description: 'Target reading comprehension level',
          options: {
            list: [
              { title: 'Year 6 (UK) / 6th Grade (US)', value: 'year-6' },
              { title: 'Year 7 (UK) / 7th Grade (US)', value: 'year-7' },
              { title: 'Year 8 (UK) / 8th Grade (US)', value: 'year-8' },
              { title: 'Year 9+ (UK) / 9th Grade+ (US)', value: 'year-9-plus' },
            ],
          },
        }),
        defineField({
          name: 'fleschScore',
          title: 'Flesch Reading Ease Score',
          type: 'number',
          description: 'Readability score (0-100, higher = easier to read)',
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: 'pifTickCompliant',
          title: 'PIF Tick Compliant',
          type: 'boolean',
          description: 'Meets Patient Information Forum quality standards',
          initialValue: false,
        }),
        defineField({
          name: 'complianceNotes',
          title: 'Compliance Notes',
          type: 'text',
          rows: 3,
          description: 'Additional governance or compliance information',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'totalRecoveryDays',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} days recovery` : 'No timeline set',
      };
    },
  },
});
