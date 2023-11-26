import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { FromSchema } from 'json-schema-to-ts'
import type {
  errorSchema,
  ftpSchema,
  savegameHistorySchema,
  savegameSchema,
  sharedSchema,
} from '../server'
import { profilesSchema } from '../server'

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

export interface Profile {
  profileId: string
  username: string | undefined
  avatar: string | undefined
}

export type Profiles = FromSchema<typeof profilesSchema>

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
