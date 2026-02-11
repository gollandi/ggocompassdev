import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ggoLocation',
  title: 'GGO Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "London Bridge Hospital", "Manchester Clinic"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Short Name',
      type: 'string',
      description: 'Abbreviated name for display in UI (e.g., "LBH", "Manchester")',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo (optional)',
      type: 'image',
      description: 'Upload a site-specific logo to be shown in the app when appropriate',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the logo for accessibility',
        }),
        defineField({
          name: 'attribution',
          title: 'Attribution/Credit',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Street Address',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'postcode',
          title: 'Postcode',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'United Kingdom',
        }),
      ],
    }),
    defineField({
      name: 'contacts',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'main',
          title: 'Main Reception',
          type: 'object',
          fields: [
            defineField({
              name: 'phone',
              title: 'Phone Number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'email',
              title: 'Email Address',
              type: 'string',
              validation: (Rule) => Rule.email(),
            }),
            defineField({
              name: 'hours',
              title: 'Operating Hours',
              type: 'string',
              description: 'e.g., "Mon-Fri 8:00-18:00, Sat 9:00-13:00"',
            }),
          ],
        }),
        defineField({
          name: 'booking',
          title: 'Booking Team',
          type: 'object',
          fields: [
            defineField({
              name: 'phone',
              title: 'Booking Phone',
              type: 'string',
            }),
            defineField({
              name: 'email',
              title: 'Booking Email',
              type: 'string',
              validation: (Rule) => Rule.email(),
            }),
            defineField({
              name: 'hours',
              title: 'Booking Hours',
              type: 'string',
            }),
            defineField({
              name: 'onlineBookingUrl',
              title: 'Online Booking URL',
              type: 'url',
            }),
          ],
        }),
        defineField({
          name: 'ward',
          title: 'Ward/Department',
          type: 'object',
          fields: [
            defineField({
              name: 'phone',
              title: 'Ward Phone',
              type: 'string',
            }),
            defineField({
              name: 'nurseStation',
              title: 'Nurse Station Phone',
              type: 'string',
            }),
            defineField({
              name: 'hours',
              title: 'Contact Hours',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'emergency',
          title: 'Emergency Contacts',
          type: 'object',
          fields: [
            defineField({
              name: 'urgentLine',
              title: 'Urgent Clinical Line',
              type: 'string',
              description: 'Direct line for urgent clinical concerns',
            }),
            defineField({
              name: 'outOfHours',
              title: 'Out of Hours Contact',
              type: 'string',
            }),
            defineField({
              name: 'consultantSecretary',
              title: 'Consultant Secretary',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Available Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Service Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Service Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'contactPhone',
              title: 'Service Phone',
              type: 'string',
            }),
            defineField({
              name: 'contactEmail',
              title: 'Service Email',
              type: 'string',
              validation: (Rule) => Rule.email(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'object',
      fields: [
        defineField({
          name: 'parking',
          title: 'Parking Information',
          type: 'object',
          fields: [
            defineField({
              name: 'available',
              title: 'Parking Available',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'cost',
              title: 'Parking Cost',
              type: 'string',
              description: 'e.g., "£2/hour", "Free for first 2 hours"',
            }),
            defineField({
              name: 'instructions',
              title: 'Parking Instructions',
              type: 'text',
              rows: 2,
            }),
          ],
        }),
        defineField({
          name: 'publicTransport',
          title: 'Public Transport',
          type: 'object',
          fields: [
            defineField({
              name: 'nearestStation',
              title: 'Nearest Station',
              type: 'string',
            }),
            defineField({
              name: 'busRoutes',
              title: 'Bus Routes',
              type: 'string',
            }),
            defineField({
              name: 'walkingTime',
              title: 'Walking Time from Station',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'accessibility',
          title: 'Accessibility Features',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'e.g., "Wheelchair accessible", "Hearing loop", "Large print available"',
        }),
      ],
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      description: 'Direct link to location on Google Maps',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Location',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this location is currently active and available for selection',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which locations should be displayed (lower numbers first)',
    }),
    defineField({
      name: 'specialInstructions',
      title: 'Special Instructions',
      type: 'text',
      rows: 3,
      description: 'Any special instructions for patients visiting this location',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address.city',
      active: 'isActive',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${title}${!active ? ' (Inactive)' : ''}`,
        subtitle: subtitle || 'No city specified',
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
