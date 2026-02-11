import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'videoResourceBlock',
    title: 'Embedded Video',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Video Title',
            type: 'string',
        }),
        defineField({
            name: 'url',
            title: 'Video URL',
            type: 'url',
            description: 'YouTube, Vimeo or other supported embed URL',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'thumbnail',
            title: 'Cover Image',
            type: 'image',
        }),
        defineField({
            name: 'description',
            title: 'Caption/Description',
            type: 'text',
            rows: 2
        }),
    ],
    preview: {
        select: {
            title: 'title',
            url: 'url',
        },
        prepare({ title, url }) {
            return {
                title: title || 'Video',
                subtitle: url,
            };
        },
    },
});
