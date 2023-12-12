import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import type { FromSchema } from 'json-schema-to-ts'
import type {
  errorSchema,
  ftpSchema,
  profileSchema,
  savegameHistorySchema,
  savegameSchema,
  sharedSchema,
} from '../server'

export interface ServeOptions {
  host: string
  port: number
  open: boolean
  log: boolean
}

export interface ServerAdresses {
  address: string
  internal: boolean
}

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

export type JsonSchemaToTsProviderWithSharedSchema = JsonSchemaToTsProvider<{
  references: [typeof sharedSchema]
}>
