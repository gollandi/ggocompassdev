import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ggoTimelineStep',
  title: 'GGO Timeline Step',
  type: 'document',
  fields: [
    defineField({
      name: 'procedure',
      title: 'Procedure',
      type: 'reference',
      to: [{ type: 'ggoProcedure' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phase',
      title: 'Phase',
      type: 'string',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Prepare', value: 'prepare' },
          { title: 'Attend', value: 'attend' },
          { title: 'Recover', value: 'recover' },
          { title: 'Review', value: 'review' },
        ],
        layout: 'radio',
      },
      description: 'Matches the Compass phase rail (Book → Prepare → Attend → Recover → Review)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe',
      type: 'string',
      description: 'When this step occurs (e.g., "2 weeks before", "Day before", "Day of surgery")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tasks',
      title: 'Tasks',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of tasks to complete for this step',
    }),
    defineField({
      name: 'video',
      title: 'Instructional Video',
      type: 'object',
      description: 'Short video explaining this step (e.g., "30 second overview")',
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
          description: 'e.g., "30 second overview"',
        },
        {
          name: 'thumbnail',
          title: 'Custom Thumbnail',
          type: 'image',
          description: 'Optional thumbnail (auto-fetched from video platform if not provided)',
        },
        {
          name: 'duration',
          title: 'Duration',
          type: 'string',
          description: 'Video length (e.g., "0:30")',
        },
      ],
    }),
    defineField({
      name: 'clinicalGuidance',
      title: 'Clinical Guidance',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed instructions for this step',
    }),
    defineField({
      name: 'redFlags',
      title: 'Red Flag Symptoms',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Procedure-specific symptoms that require immediate contact. Overrides the generic fallback list. Use specific, measurable language (e.g. "Fever above 38°C"). Leave empty to use the generic BAUS post-op fallback.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this step appears in the timeline',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isCompleted',
      title: 'Completed by Default',
      type: 'boolean',
      description: 'Whether this step is marked as completed when first shown',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      timeframe: 'timeframe',
      procedure: 'procedure.name',
      order: 'order',
    },
    prepare({ title, timeframe, procedure, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${procedure} - ${timeframe}`,
      };
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
