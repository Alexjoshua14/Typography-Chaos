import { z } from 'zod'

export const CoordinateSchema = z.array(z.number()).min(2).max(3)

export type Coordinate = z.infer<typeof CoordinateSchema>

export const CoordinateListSchema = z.array(CoordinateSchema)

export const ChaosServerResponse = z.object({
  result: CoordinateListSchema
})