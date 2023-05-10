import { FromSchema } from 'json-schema-to-ts'

export interface ServerOptions {
  host: string
  port: number
  open: boolean
  log: boolean
}

export type Options = FromSchema<typeof OptionsSchema>

export const OptionsSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ftp: {
      type: 'object',
      additionalProperties: false,
      properties: {
        ip: { type: 'string' },
        port: { type: 'number' },
        user: { type: 'string' },
        password: { type: 'string' },
        secure: { type: 'boolean' },
        sound: { type: 'boolean' },
        debug: { type: 'boolean' },
      },
      required: ['ip'],
    },
    savegame: {
      type: 'object',
      additionalProperties: false,
      properties: {
        profileId: { type: 'string' },
        cusa: { type: 'string' },
        sdimg: { type: 'string' },
        backupPath: { type: 'string' },
      },
      required: ['profileId', 'cusa', 'sdimg', 'backupPath'],
    },
  },
  required: ['ftp', 'savegame'],
} as const
