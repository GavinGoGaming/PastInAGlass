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
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'photographer',
            type: 'string',
            title: 'Photo Credit',
            description: 'Optional instagram username (without @) to credit photographer of the drink image.',
            initialValue: 'reikomasutani',
        }),
        defineField({
            name: 'image',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'header',
            title: 'Header Image',
            description: 'Optional recommended image for the header. If not provided, main image will be used.',
            type: 'image',
        }),
        defineField({
            name: 'body',
            title: "Body / Description",
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'recipe',
            title: "Recipe",
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram Post URL',
            type: 'url',
            description: 'Optional Instagram post URL.',
        }),
    ],
})