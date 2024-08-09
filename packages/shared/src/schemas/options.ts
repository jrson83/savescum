import { errorSchema } from './error'
import { ftpSchema } from './ftp'
import { profileSchema } from './profile'
import { savegameDetailSchema, savegameSchema } from './savegame'

/*
type JSONSchema = boolean | Readonly<{
    $id?: string | undefined;
    $ref?: string | undefined;
    $schema?: string | undefined;
    $comment?: string | undefined;
    type?: JSONSchemaType | readonly JSONSchemaType[];
    ... 43 more ...;
    [$JSONSchema]?: $JSONSchema;
}>

*/
export const ftpOptionsSchema = {
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        ftp: ftpSchema /* {
          $ref: 'shared-schema#/definitions/ftp',
        } */,
      },
      required: ['ftp'],
    },
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          savegame: savegameSchema /* {
            $ref: 'shared-schema#/definitions/savegame',
          } */,
        },
        required: ['success', 'message'],
        '4xx': {
          error: errorSchema /* {
            $ref: 'shared-schema#/definitions/error',
          } */,
        },
      },
    },
  } as const,
}

export const profilesOptionsSchema = {
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        ftp: ftpSchema /* {
          $ref: 'shared-schema#/definitions/ftp',
        } */,
      },
      required: ['ftp'],
    },
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          profiles: profileSchema /* {
            $ref: 'shared-schema#/definitions/profiles',
          } */,
        },
        required: ['success', 'message', 'profiles'],
        '4xx': {
          error: errorSchema /* {
            $ref: 'shared-schema#/definitions/error',
          } */,
        },
      },
    },
  } as const,
}

export const historyOptionsSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        savegame: savegameSchema /* {
          $ref: 'shared-schema#/definitions/savegame',
        } */,
      },
      required: ['savegame'],
    },
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          savegame: savegameDetailSchema /* {
            $ref: 'shared-schema#/definitions/savegame-detail',
          } */,
        },
        required: ['success', 'message', 'savegame'],
        '4xx': {
          error: errorSchema /* {
            $ref: 'shared-schema#/definitions/error',
          } */,
        },
      },
    },
  } as const,
}

export const savegameOptionsSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        ftp: ftpSchema /* {
          $ref: 'shared-schema#/definitions/ftp',
        } */,
        savegame: savegameSchema /* {
          $ref: 'shared-schema#/definitions/savegame',
        } */,
      },
      required: ['ftp', 'savegame'],
    },
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          savegame: savegameSchema /* {
            $ref: 'shared-schema#/definitions/savegame',
          } */,
        },
        required: ['success', 'message'],
        '4xx': {
          error: errorSchema /* {
            $ref: 'shared-schema#/definitions/error',
          } */,
        },
      },
    },
  } as const,
}
