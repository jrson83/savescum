export const ftpOptionsSchema = {
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        ftp: {
          $ref: 'shared-schema#/definitions/ftp',
        },
      },
      required: ['ftp'],
    },
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          savegame: {
            $ref: 'shared-schema#/definitions/savegame',
          },
        },
        required: ['success', 'message'],
        '4xx': {
          error: {
            $ref: 'shared-schema#/definitions/error',
          },
        },
      },
    },
  },
} as const

export const profilesOptionsSchema = {
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        ftp: {
          $ref: 'shared-schema#/definitions/ftp',
        },
      },
      required: ['ftp'],
    },
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          profiles: {
            $ref: 'shared-schema#/definitions/profiles',
          },
        },
        required: ['success', 'message', 'profiles'],
        '4xx': {
          error: {
            $ref: 'shared-schema#/definitions/error',
          },
        },
      },
    },
  },
} as const

export const historyOptionsSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        savegame: {
          $ref: 'shared-schema#/definitions/savegame',
        },
      },
      required: ['savegame'],
    },
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          savegame: {
            $ref: 'shared-schema#/definitions/savegame-detail',
          },
        },
        required: ['success', 'message', 'savegame'],
        '4xx': {
          error: {
            $ref: 'shared-schema#/definitions/error',
          },
        },
      },
    },
  },
} as const

export const savegameOptionsSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        ftp: {
          $ref: 'shared-schema#/definitions/ftp',
        },
        savegame: {
          $ref: 'shared-schema#/definitions/savegame',
        },
      },
      required: ['ftp', 'savegame'],
    },
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          savegame: {
            $ref: 'shared-schema#/definitions/savegame',
          },
        },
        required: ['success', 'message'],
        '4xx': {
          error: {
            $ref: 'shared-schema#/definitions/error',
          },
        },
      },
    },
  },
} as const
