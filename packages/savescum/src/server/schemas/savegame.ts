export const savegameSchema = {
  title: 'Savegame Schema',
  description: 'Placeholder',
  type: 'object',
  additionalProperties: false,
  properties: {
    profileId: { type: 'string' },
    cusa: { type: 'string' },
    sdimg: { type: 'string' },
    backupPath: { type: 'string' },
  },
  required: ['profileId', 'cusa', 'sdimg'],
} as const

export const savegameHistorySchema = {
  title: 'Savegame History Schema',
  description: 'Placeholder',
  type: 'object',
  additionalProperties: false,
  properties: {
    history: {
      type: 'array',
      additionalItems: false,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { type: 'number' },
          timestamp: { type: 'string' },
          mtime: { type: 'number' },
          size: { type: 'string' },
        },
        required: ['id', 'timestamp', 'mtime', 'size'],
      },
    },
  },
  required: ['history'],
} as const

export const savegameDetailSchema = {
  title: 'Savegame with Details Schema',
  description: 'Placeholder',
  allOf: [
    {
      savegameSchema,
    },
    {
      savegameHistorySchema,
    },
  ],
}

/* export const savegameHistorySchema = {
  title: 'Savegame with History Schema',
  description: 'Placeholder',
  allOf: [
    {
      $ref: 'shared-schema#/definitions/savegame',
    },
  ],
  type: 'object',
  additionalProperties: false,
  properties: {
    history: {
      type: 'array',
      additionalItems: false,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { type: 'number' },
          timestamp: { type: 'string' },
          mtime: { type: 'number' },
          size: { type: 'string' },
        },
        required: ['id', 'timestamp', 'mtime', 'size'],
      },
    },
  },
  required: ['history'],
} as const */

/* export const savegameHistorySchema = {
  allOf: [
    {
      $ref: 'shared-schema#/definitions/savegame',
    },
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        history: {
          type: 'array',
          additionalItems: false,
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              id: { type: 'number' },
              timestamp: { type: 'string' },
              mtime: { type: 'number' },
              size: { type: 'string' },
              sizex: { type: 'string' },
            },
            required: ['id', 'timestamp', 'mtime', 'size'],
          },
        },
      },
      required: ['history'],
    },
  ],
} as const
 */
