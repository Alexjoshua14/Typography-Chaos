import { z } from 'zod'
import { BoundingBoxSchema } from './BoundingBox'
import { PointSchema } from './Point'

export const ChaosServerResponse = z.object({
  result: z.object({
    'boundingBox': BoundingBoxSchema,
    'points': z.array(PointSchema),
  })
})