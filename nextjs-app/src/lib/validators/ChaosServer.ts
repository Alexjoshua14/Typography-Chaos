import { z } from 'zod'
import { BoundingBoxSchema } from './BoundingBox'
import { PointSchema } from './Point'
import { ChaosCharacterSchema } from './ChaosCharacter'

export const ChaosServerResponse = z.object({
  result: ChaosCharacterSchema
})