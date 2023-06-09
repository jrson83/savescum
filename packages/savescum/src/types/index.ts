import type {
  errorSchema,
  ftpSchema,
  savegameHistorySchema,
  savegameSchema,
  sharedSchema,
} from '../server'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { FromSchema } from 'json-schema-to-ts'

export interface ServeOptions {
  host: string
  port: number
  open: boolean
  log: boolean
}

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
