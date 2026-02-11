import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'accordionBlock',
    title: 'Accordion / Collapsible',
    type: 'object',
    fields: [
        defineField({
            name: 'accordionType',
            title: 'Accordion Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Standard', value: 'standard' },
                    { title: 'Medical Detail', value: 'medical' },
                ],
            },
            initialValue: 'standard',
        }),
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Accordion Item',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [{ type: 'block' }],
                        }),
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            items: 'items',
        },
        prepare({ items }) {
            return {
                title: 'Accordion Group',
                subtitle: `${items?.length || 0} items`,
            };
        },
    },
});
