import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'cardBlock',
    title: 'Highlighted Card',
    type: 'object',
    fields: [
        defineField({
            name: 'tone',
            title: 'Tone',
            type: 'string',
            options: {
                list: [
                    { title: 'Clinical (Blue/Teal)', value: 'clinical' },
                    { title: 'Supportive (Warm)', value: 'supportive' },
                    { title: 'Alert (Warning)', value: 'alert' },
                    { title: 'Info (Neutral)', value: 'info' },
                ],
            },
            initialValue: 'info',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name (Lucide)',
            type: 'string',
            description: 'e.g. "Info", "AlertTriangle", "Heart"'
        })
    ],
    preview: {
        select: {
            heading: 'heading',
            tone: 'tone',
        },
        prepare({ heading, tone }) {
            return {
                title: heading || 'Untitled Card',
                subtitle: `Style: ${tone}`,
            };
        },
    },
});
