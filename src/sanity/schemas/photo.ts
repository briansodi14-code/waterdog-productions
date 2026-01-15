import { defineField, defineType } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date Taken",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: [
          { title: "HB Pier", value: "HB Pier" },
          { title: "Newport", value: "Newport" },
          { title: "San Clemente", value: "San Clemente" },
          { title: "Laguna", value: "Laguna" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      media: "image",
      date: "date",
      location: "location",
      featured: "featured",
    },
    prepare({ media, date, location, featured }) {
      return {
        title: `${location} - ${date}`,
        subtitle: featured ? "Featured" : "",
        media,
      };
    },
  },
});
