export const errorSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    code: { type: 'string' },
    error: { type: 'string' },
    message: { type: 'string' },
    statusCode: { type: 'number' },
  },
  required: ['error', 'message', 'statusCode'],
} as const
