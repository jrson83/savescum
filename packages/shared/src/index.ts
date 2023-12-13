import type { FromSchema } from 'json-schema-to-ts'
import {
  errorSchema,
  ftpSchema,
  profileSchema,
  savegameHistorySchema,
  savegameSchema,
} from './schemas'

export {
  ftpOptionsSchema,
  historyOptionsSchema,
  profilesOptionsSchema,
  savegameOptionsSchema,
  sharedSchema,
} from './schemas'

export type SDIMG = FromSchema<
  (typeof profileSchema)['items']['properties']['savedata']['items']['properties']['sdimg']
>

export type SaveData = FromSchema<
  (typeof profileSchema)['items']['properties']['savedata']
>

export type Profile = FromSchema<(typeof profileSchema)['items']>

export type Profiles = FromSchema<typeof profileSchema>

export type ErrorSchema = FromSchema<typeof errorSchema>

export type FtpSchema = FromSchema<typeof ftpSchema>

export type SavegameSchema = FromSchema<typeof savegameSchema>

export type SavegameDetailsSchema = FromSchema<typeof savegameHistorySchema>

export type OptionsSchema = {
  ftp: FtpSchema
  savegame: SavegameSchema
}

export {
  errorSchema,
  ftpSchema,
  profileSchema,
  savegameHistorySchema,
  savegameSchema,
}
