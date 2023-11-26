export const profilesSchema = {
  type: 'array',
  additionalItems: false,
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
    },
    required: ['profileId', 'username'],
  },
} as const
