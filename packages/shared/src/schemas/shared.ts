import { errorSchema } from './error'
import { ftpSchema } from './ftp'
import { profileSchema } from './profile'
import {
  savegameDetailSchema,
  savegameHistorySchema,
  savegameSchema,
} from './savegame'

export const sharedSchema = {
  $id: 'shared-schema',
  definitions: {
    ftp: ftpSchema,
    profiles: profileSchema,
    savegame: savegameSchema,
    'savegame-detail': savegameDetailSchema,
    history: savegameHistorySchema,
    error: errorSchema,
  },
} as const
