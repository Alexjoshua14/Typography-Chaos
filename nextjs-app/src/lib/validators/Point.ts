import { z } from "zod";

export const PointSchema = z.tuple([z.number(), z.number(), z.number().optional()])

export type Point = z.infer<typeof PointSchema>