import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "./access";

export const Activities: CollectionConfig = {
  slug: "activities",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "startDate", "endDate", "location"],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "yyyy-MM-dd HH:mm",
        },
        description: "When the event starts (used to compute live status)",
      },
      validate: (value: Date | null | undefined) => {
        if (!value) return true; // let required handle it
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return "Invalid date format";
        }
        return true;
      },
    },
    {
      name: "endDate",
      type: "date",
      required: false,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "yyyy-MM-dd HH:mm",
        },
        description:
          "When the event ends. Leave blank to default to startDate + 2 hours.",
      },
      validate: (value: Date | null | undefined) => {
        if (!value) return true;
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return "Invalid date format";
        }
        return true;
      },
    },
    {
      name: "location",
      type: "text",
      required: false,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "speakers",
      type: "array",
      required: false,
      admin: {
        description: "Speakers or presenters at this event",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  defaultSort: "-startDate",
  timestamps: true,
};
