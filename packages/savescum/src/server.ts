import { FTPClient } from './ftp-client'
import type { Options, ServerOptions } from './types'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import resolveWebRoot from '@savescum/web'
import Fastify from 'fastify'

export const startServer = async (options: ServerOptions) => {
  const fastify = Fastify({
    logger: !!options.log,
  }).withTypeProvider<JsonSchemaToTsProvider>()

  try {
    await fastify.register(import('@fastify/static'), {
      root: resolveWebRoot(),
    })

    fastify.get('/', (_req, reply) => {
      reply.sendFile('index.html')
    })

    fastify.setNotFoundHandler((request, reply) => {
      if (request.raw.url?.startsWith('/api')) {
        reply.code(404).send({
          success: false,
          error: {
            kind: 'user_input',
            message: 'Resource not found',
          },
        })
      }
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

    await fastify.listen({
      port: options.port,
      host: options.host,
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
