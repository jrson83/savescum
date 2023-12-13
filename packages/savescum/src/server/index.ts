import resolveWebRoot from '@savescum/web'
import Fastify from 'fastify'
import { FTPClient, NodeClient } from '../core'
import {
  type JsonSchemaToTsProviderWithSharedSchema,
  type ServeOptions,
  ftpOptionsSchema,
  historyOptionsSchema,
  profilesOptionsSchema,
  savegameOptionsSchema,
  sharedSchema,
} from '../types'

export const startServer = async (options: ServeOptions) => {
  const fastify = Fastify({
    logger: !!options.log,
  }).withTypeProvider<JsonSchemaToTsProviderWithSharedSchema>()

  try {
    await fastify.register(import('@fastify/static'), {
      root: resolveWebRoot(),
    })

    fastify.addSchema(sharedSchema)

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

    fastify.post('/api/test', ftpOptionsSchema, async (request, reply) => {
      const data = await FTPClient.test(request.body.ftp)
      return reply.code(200).send(data)
    })

    fastify.post(
      '/api/profiles',
      profilesOptionsSchema,
      async (request, reply) => {
        const data = await FTPClient.profiles(request.body.ftp)
        return reply.code(200).send(data)
      }
    )

    fastify.post(
      '/api/history',
      historyOptionsSchema,
      async (request, reply) => {
        const data = await NodeClient.history(request.body.savegame)
        return reply.code(200).send(data)
      }
    )

    fastify.post(
      '/api/ensure',
      savegameOptionsSchema,
      async (request, reply) => {
        const data = await FTPClient.ensure(request.body)
        return reply.code(200).send(data)
      }
    )

    fastify.post(
      '/api/backup',
      savegameOptionsSchema,
      async (request, reply) => {
        const data = await FTPClient.backup(request.body)
        return reply.code(200).send(data)
      }
    )

    fastify.post(
      '/api/restore',
      savegameOptionsSchema,
      async (request, reply) => {
        const data = await FTPClient.restore(request.body)
        return reply.code(200).send(data)
      }
    )

    await fastify.listen({
      port: options.port,
      host: options.host,
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
