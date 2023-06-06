import { errorSchema } from './error'
import { ftpSchema } from './ftp'
import { savegameSchema } from './savegame'

export const sharedSchema = {
  $id: 'shared-schema',
  definitions: {
    ftp: ftpSchema,
    savegame: savegameSchema,
    error: errorSchema,
  },
  type: 'object',
  additionalProperties: false,
  properties: {
    ftp: {
      $ref: 'shared-schema#/definitions/ftp',
    },
    savegame: {
      $ref: 'shared-schema#/definitions/savegame',
    },
  },
  required: ['ftp', 'savegame'],
} as const
