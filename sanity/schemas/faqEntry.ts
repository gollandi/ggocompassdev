import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'faqEntry',
    title: 'FAQ Entry',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'question',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'General', value: 'general' },
                    { title: 'Pre-op', value: 'pre-op' },
                    { title: 'Recovery', value: 'recovery' },
                    { title: 'Billing/Admin', value: 'admin' },
                ]
            }
        }),
        defineField({
            name: 'relatedProcedures',
            title: 'Related Procedures',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'ggoProcedure' }] }]
        })
    ],
    preview: {
        select: {
            title: 'question',
            category: 'category',
        },
        prepare({ title, category }) {
            return {
                title,
                subtitle: category ? `Category: ${category}` : 'Uncategorized',
            };
        },
    },
});
