import type { JSONSchema } from 'json-schema-to-ts'

export const profileSchema = {
  type: 'array',
  items: {
    type: 'object',
    additionalProperties: false,
    properties: {
      profileId: {
        type: 'string',
      },
      username: {
        type: 'string',
      },
      avatar: {
        type: 'string',
      },
      savedata: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            cusa: {
              type: 'string',
            },
            sdimg: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  name: {
                    type: 'string',
                  },
                  size: {
                    type: 'number',
                  },
                },
                required: ['name', 'size'],
              },
              minItems: 1,
              uniqueItems: true,
            },
          },
          required: ['cusa', 'sdimg'],
        },
        minItems: 1,
        uniqueItems: true,
      },
    },
    required: ['profileId', 'username'],
  },
  minItems: 1,
  uniqueItems: true,
} as const satisfies JSONSchema
