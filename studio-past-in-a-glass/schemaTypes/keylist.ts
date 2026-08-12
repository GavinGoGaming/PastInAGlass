import { defineField, defineType } from 'sanity'
import { client } from './sanityclient';

export const keylistType = defineType({
    name: 'keylist',
    title: 'Tag List',
    description: 'A list of tags used for content categories (specifically for Spirits)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'tags',
            options: {
                // includeFromRelated: 'tags',
                predefinedTags: async () => {
                    const query = `*[_type == "drink" && defined(tags)].tags[]`
                    const tags = await client.fetch(query);
                    const uniqueTags = Array.from(new Set(tags));
                    return uniqueTags.map((tag: any) => (tag));
                }
            },
            validation: (rule) => rule.required(),
        }),
    ],
})