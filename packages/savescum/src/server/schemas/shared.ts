import { errorSchema } from './error'
import { ftpSchema } from './ftp'
import {
  savegameDetailSchema,
  savegameHistorySchema,
  savegameSchema,
} from './savegame'

export const sharedSchema = {
  $id: 'shared-schema',
  definitions: {
    ftp: ftpSchema,
    savegame: savegameSchema,
    'savegame-detail': savegameDetailSchema,
    history: savegameHistorySchema,
    error: errorSchema,
  },
} as const
