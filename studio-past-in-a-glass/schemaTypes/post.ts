import { defineField, defineType } from 'sanity'

export const drinkType = defineType({
    name: 'drink',
    title: 'Drink',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'tags',
            options: {
                includeFromRelated: 'tags',
            }
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            type: 'image',
        }),
        defineField({
            name: 'body',
            title: "Body / Description",
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'recipe',
            title: "Recipe",
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})