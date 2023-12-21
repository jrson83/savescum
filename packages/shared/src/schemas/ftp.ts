import { profileSchema } from './profile'

export const ftpSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ip: {
      type: 'string',
      format: 'ipv4',
    },
    port: { type: 'number' },
    user: { type: 'string' },
    password: { type: 'string' },
    sound: { type: 'boolean' },
    debug: { type: 'boolean' },
    profiles: profileSchema,
    requestType: { type: 'string', enum: ['browser', 'node'] },
  },
  required: ['ip', 'port', 'user', 'profiles', 'requestType'],
} as const
