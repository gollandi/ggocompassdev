import { defineField, defineType } from 'sanity'

export const medicalCode = defineType({
  name: 'medicalCode',
  title: 'Medical Code',
  type: 'object',
  fields: [
    defineField({
      name: 'codeSystem',
      title: 'Code System',
      type: 'string',
      description: 'Select the terminology system for this code.',
      options: {
        list: [
          { title: 'ICD-10', value: 'ICD-10' },
          { title: 'SNOMED CT', value: 'SNOMED CT' },
          { title: 'OPCS-4', value: 'OPCS-4' },
          { title: 'RxNorm', value: 'RxNorm' },
          { title: 'ATC', value: 'ATC' },
        ],
      },
      validation: (Rule) =>
        Rule.required().error('Select the terminology system for this medical code.'),
    }),
    defineField({
      name: 'codeValue',
      title: 'Code Value',
      type: 'string',
      description: 'Enter the exact value from the selected terminology system.',
      validation: (Rule) =>
        Rule.required().error(
          'Enter the code value from the selected terminology system.',
        ),
    }),
    defineField({
      name: 'name',
      title: 'Official Label/Name',
      type: 'string',
      description:
        'The official human-readable label for this code from the terminology system (e.g. "Varicocele" for ICD-10 code I86.1).',
    }),
    defineField({
      name: 'url',
      title: 'Reference URL',
      type: 'url',
      description: 'Link to the official terminology browser or reference source.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).error(
          'Must be a valid http or https URL',
        ),
    }),
    defineField({
      name: 'isPrimary',
      title: 'Is Primary Code?',
      type: 'boolean',
      initialValue: false,
      description: 'Check if this is the main code for the entity.',
    }),
  ],
  preview: {
    select: {
      codeSystem: 'codeSystem',
      codeValue: 'codeValue',
      isPrimary: 'isPrimary',
    },
    prepare({ codeSystem, codeValue, isPrimary }) {
      const system = codeSystem || 'Code'
      const value = codeValue || 'Untitled'
      return {
        title: `${system}: ${value}`,
        subtitle: isPrimary ? 'Primary Code' : 'Secondary Code',
      }
    },
  },
})
