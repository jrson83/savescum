export const savegameSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    profileId: { type: 'string' },
    cusa: { type: 'string' },
    sdimg: { type: 'string' },
    backupPath: { type: 'string' },
  },
  required: ['profileId', 'cusa', 'sdimg'],
} as const
