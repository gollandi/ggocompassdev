import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ggoRecoveryDay',
  title: 'GGO Recovery Day',
  type: 'document',
  fields: [
    defineField({
      name: 'dayNumber',
      title: 'Day Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(365),
    }),
    defineField({
      name: 'procedure',
      title: 'Procedure',
      type: 'reference',
      to: [{ type: 'ggoProcedure' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phase',
      title: 'Recovery Phase',
      type: 'string',
      options: {
        list: [
          { title: 'Surgery', value: 'surgery' },
          { title: 'Early Recovery', value: 'early' },
          { title: 'Healing', value: 'healing' },
          { title: 'Strengthening', value: 'strengthening' },
          { title: 'Final Phase', value: 'final' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phaseLabel',
      title: 'Phase Label',
      type: 'string',
      description: 'Custom label for this phase (e.g., "Week 1", "First 48 Hours")',
    }),
    defineField({
      name: 'title',
      title: 'Day Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'normalExperiences',
      title: 'Normal Experiences',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'accordionBlock' },
        { type: 'cardBlock' },
        { type: 'videoResourceBlock' }
      ],
      description: 'What the patient can expect to experience today',
    }),
    defineField({
      name: 'forecast',
      title: 'Forecast',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'accordionBlock' },
        { type: 'cardBlock' },
        { type: 'videoResourceBlock' }
      ],
      description: 'What to expect in the coming days',
    }),
    defineField({
      name: 'redFlags',
      title: 'Red Flags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Warning signs that require immediate medical attention',
    }),
    defineField({
      name: 'activities',
      title: 'Activities & Restrictions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., "Pill", "Activity", "Shower")',
            },
            {
              name: 'label',
              title: 'Activity Label',
              type: 'string',
            },
            {
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  { title: 'Allowed', value: 'allowed' },
                  { title: 'Caution', value: 'caution' },
                  { title: 'Avoid', value: 'avoid' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'nurseNote',
      title: 'Nurse Note',
      type: 'text',
      rows: 3,
      description: 'Personal note from the nurse',
    }),
    defineField({
      name: 'nurseName',
      title: 'Nurse Name',
      type: 'string',
    }),
    defineField({
      name: 'whyThisHappens',
      title: 'Why This Happens',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'accordionBlock' },
        { type: 'cardBlock' },
        { type: 'videoResourceBlock' }
      ],
      description: 'Medical explanation of why certain symptoms occur',
    }),
    defineField({
      name: 'educationalVideo',
      title: 'Educational Video',
      type: 'object',
      description: 'Video explaining what to expect today',
      fields: [
        {
          name: 'url',
          title: 'Video URL',
          type: 'url',
          description: 'YouTube, Vimeo, or direct video URL',
        },
        {
          name: 'title',
          title: 'Video Title',
          type: 'string',
        },
        {
          name: 'thumbnail',
          title: 'Custom Thumbnail',
          type: 'image',
          description: 'Optional custom thumbnail (auto-fetched from YouTube if not provided)',
        },
        {
          name: 'duration',
          title: 'Duration',
          type: 'string',
          description: 'Video length (e.g., "2:45")',
        },
      ],
    }),
    defineField({
      name: 'exerciseVideos',
      title: 'Exercise Videos',
      type: 'array',
      description: 'Physical therapy or exercise demonstrations',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'url',
              title: 'Video URL',
              type: 'url',
            },
            {
              name: 'title',
              title: 'Exercise Name',
              type: 'string',
            },
            {
              name: 'thumbnail',
              title: 'Thumbnail',
              type: 'image',
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'contentGovernance',
      title: 'Content Governance',
      type: 'object',
      description: 'Metadata for tracking content quality and compliance',
      options: {
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'lastUpdated',
          title: 'Last Updated',
          type: 'datetime',
          description: 'When this day\'s content was last modified',
        }),
        defineField({
          name: 'clinicallyReviewed',
          title: 'Clinically Reviewed',
          type: 'boolean',
          description: 'Has this content been reviewed by qualified clinician',
          initialValue: false,
        }),
        defineField({
          name: 'reviewedBy',
          title: 'Reviewed By',
          type: 'string',
          description: 'Name/role of reviewer',
        }),
        defineField({
          name: 'evidenceSource',
          title: 'Evidence Source',
          type: 'string',
          description: 'Guidelines or research supporting this content',
        }),
        defineField({
          name: 'changeLog',
          title: 'Change Log',
          type: 'text',
          rows: 2,
          description: 'Brief history of major changes',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      dayNumber: 'dayNumber',
      phase: 'phase',
      procedure: 'procedure.name',
    },
    prepare({ title, dayNumber, phase, procedure }) {
      return {
        title: `Day ${dayNumber}: ${title}`,
        subtitle: `${procedure} - ${phase}`,
      };
    },
  },
});
