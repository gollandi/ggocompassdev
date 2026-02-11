import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ggoMicrocopy',
  title: 'GGO Microcopy',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Unique identifier for this microcopy text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'context',
      title: 'Context/Screen',
      type: 'string',
      description: 'Where this text appears in the app',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          { title: 'Formal', value: 'formal' },
          { title: 'Friendly', value: 'friendly' },
          { title: 'Supportive', value: 'supportive' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'style',
      title: 'Text Style (Figma)',
      type: 'string',
      description: 'Figma text style name for design consistency',
    }),
    defineField({
      name: 'variants',
      title: 'Text Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'condition',
              title: 'Condition',
              type: 'string',
              description: 'When to use this variant (e.g., "pronoun:she", "tone:friendly")',
            },
            {
              name: 'text',
              title: 'Variant Text',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
      description: 'Alternative versions of this text for different contexts',
    }),
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'context',
      text: 'text',
    },
    prepare({ title, subtitle, text }) {
      return {
        title,
        subtitle,
        media: undefined,
        description: text?.substring(0, 100),
      };
    },
  },
});
