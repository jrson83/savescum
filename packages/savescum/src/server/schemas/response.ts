export const responseSchema = {
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
  },
  500: {
    $ref: 'shared-schema#/definitions/error',
  },
} as const
