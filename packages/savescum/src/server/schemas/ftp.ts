export const ftpSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    requestType: { type: 'string', enum: ['browser', 'node'] },
    ip: {
      type: 'string',
      format: 'ipv4',
    },
    port: { type: 'number' },
    user: { type: 'string' },
    password: { type: 'string' },
    secure: { type: 'boolean' },
    sound: { type: 'boolean' },
    debug: { type: 'boolean' },
  },
  required: ['requestType', 'ip', 'port', 'user'],
} as const
