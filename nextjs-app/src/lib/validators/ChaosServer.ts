import { z } from 'zod'
import { BoundingBoxSchema } from './BoundingBox'
import { PointSchema } from './Point'
import { ChaosCharacterSchema } from './ChaosCharacter'

export const ChaosServerResponse = z.object({
  result: ChaosCharacterSchema
})

export const ChaosServerAvailableFontsResponse = z.object({
  result: z.array(z.string())
})