import { FTPClient } from '../ftp-client'
import type {
  JsonSchemaToTsProviderWithSharedSchema,
  ServeOptions,
} from '../types'
import { responseSchema, sharedSchema } from './schemas'
import resolveWebRoot from '@savescum/web'
import Fastify from 'fastify'

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

    fastify.post(
      '/api/test',
      {
        schema: {
          body: {
            type: 'object',
            additionalProperties: false,
            properties: {
              ftp: {
                $ref: 'shared-schema#/definitions/ftp',
              },
            },
            required: ['ftp'],
          },
          response: responseSchema,
        } as const,
      },
      async (request, reply) => {
        /* try { */
        const data = await FTPClient.test(request.body.ftp)
        return reply.code(200).send(data)
        /* } catch (err: unknown) {
          if (err instanceof Error) {
            request.log.error(err)
            return reply.status(500).send({ ...err })
          }
        } */
      }
    )

    fastify.post(
      '/api/backup',
      {
        schema: {
          body: sharedSchema,
          response: responseSchema,
        } as const,
      },
      async (request, reply) => {
        const data = await FTPClient.backup(request.body)
        return reply.code(200).send(data)
      }
    )

    fastify.post(
      '/api/restore',
      {
        schema: {
          body: sharedSchema,
          response: responseSchema,
        } as const,
      },
      async (request, reply) => {
        const data = await FTPClient.backup(request.body)
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
