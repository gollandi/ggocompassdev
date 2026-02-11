import { defineField, defineType } from 'sanity'

/**
 * Medical Entity Data schemas
 * Structured data for medical conditions and procedures used for Schema.org markup
 */

// 1. The Condition Entity (e.g., "Varicocele")
export const medicalConditionEntity = defineType({
  name: 'medicalConditionEntity',
  title: 'Medical Condition Data (SEO)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Official Condition Name',
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
    }),
    defineField({
      name: 'schemaId',
      title: 'Schema.org ID (stable)',
      type: 'string',
      description:
        'Optional stable ID used in JSON-LD. If empty, it will be derived from the site URL and slug.',
    }),
    defineField({
      name: 'alternateNames',
      type: 'array',
      title: 'Synonyms',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'symptoms',
      title: 'Key Symptoms',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        "List precise symptoms (e.g., 'Scrotal pain', 'Curvature'). Used for Schema.org 'signOrSymptom'.",
    }),
    defineField({
      name: 'associatedAnatomy',
      title: 'Associated Anatomy',
      type: 'string',
      options: {
        list: ['Penis', 'Testicle', 'Prostate', 'Bladder', 'Urethra', 'Kidney'],
      },
    }),
    defineField({
      name: 'guidelineURL',
      type: 'url',
      title: 'Guideline Link (EAU/NICE) [DEPRECATED]',
      description: 'Deprecated: Use "Guideline Links" field instead. This field is kept for backward compatibility.',
      hidden: true,
    }),
    defineField({
      name: 'guidelineURLs',
      type: 'array',
      title: 'Guideline Links',
      of: [{ type: 'url' }],
      description: 'Add one or more guideline URLs (e.g., EAU, NICE, AUA). Replaces the deprecated singular field.',
    }),
  ],
})

// 2. The Procedure Entity (e.g., "Microsurgical Varicocelectomy")
export const medicalProcedureEntity = defineType({
  name: 'medicalProcedureEntity',
  title: 'Medical Procedure Data (SEO)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Official Procedure Name',
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
    }),
    defineField({
      name: 'schemaId',
      title: 'Schema.org ID (stable)',
      type: 'string',
      description:
        'Optional stable ID used in JSON-LD. If empty, it will be derived from the site URL and slug.',
    }),
    defineField({
      name: 'procedureType',
      type: 'string',
      options: {
        list: ['Surgical', 'Non-surgical', 'Diagnostic'],
      },
    }),
    defineField({
      name: 'bodyLocation',
      type: 'string',
      title: 'Body Location',
    }),
    defineField({
      name: 'recoveryTime',
      type: 'string',
      title: "Typical Recovery Time (e.g. '2 weeks')",
    }),
    defineField({
      name: 'risks',
      type: 'array',
      title: 'Potential Complications',
      of: [{ type: 'string' }],
    }),
  ],
})
