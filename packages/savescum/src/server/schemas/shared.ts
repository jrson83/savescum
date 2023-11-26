import { errorSchema } from './error'
import { ftpSchema } from './ftp'
import { profilesSchema } from './profile'
import {
  savegameDetailSchema,
  savegameHistorySchema,
  savegameSchema,
} from './savegame'

export const sharedSchema = {
  $id: 'shared-schema',
  definitions: {
    ftp: ftpSchema,
    profiles: profilesSchema,
    savegame: savegameSchema,
    'savegame-detail': savegameDetailSchema,
    history: savegameHistorySchema,
    error: errorSchema,
  },
} as const
