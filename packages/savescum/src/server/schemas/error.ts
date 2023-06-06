export const errorSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    code: { type: 'string' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['statusCode', 'error', 'message'],
} as const
