import { FTPClient } from './ftp-client'
import type { Options, ServerOptions } from './types'
import { getWorkspaceRoot } from './utils'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import Fastify from 'fastify'

export const startServer = async (options: ServerOptions) => {
  const fastify = Fastify({
    logger: true /* !!options.log */,
  }).withTypeProvider<JsonSchemaToTsProvider>()

  fastify.register(import('@fastify/static'), {
    root: await getWorkspaceRoot(),
  })

  fastify.get('/', function (_req, reply) {
    reply.sendFile('index.html')
  })

  fastify.post<{ Body: Options }>('/api/test', async (request, reply) => {
    try {
      const data = await FTPClient.test(request.body.ftp)
      reply.type('application/json').code(200)
      return { ...data }
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { status: 500 }
      }
    }
  })

  fastify.post<{ Body: Options }>('/api/backup', async (request, reply) => {
    const data = await FTPClient.backup(request.body)
    reply.type('application/json').code(200)
    return { ...data }
  })

  fastify.post<{ Body: Options }>('/api/restore', async (request, reply) => {
    const data = await FTPClient.backup(request.body)
    reply.type('application/json').code(200)
    return { ...data }
  })

  fastify.listen(
    { port: options.port, host: options.host },
    function (err, _address) {
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    }
  )
}
