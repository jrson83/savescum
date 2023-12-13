import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { sharedSchema } from '@savescum/shared'

export * from '@savescum/shared'

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

export type JsonSchemaToTsProviderWithSharedSchema = JsonSchemaToTsProvider<{
  references: [typeof sharedSchema]
}>
