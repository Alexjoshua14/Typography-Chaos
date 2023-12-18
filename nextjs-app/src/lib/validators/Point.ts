import { z } from "zod";

export const PointSchema = z.tuple([z.number(), z.number(), z.number().nullable()])

export type Point = z.infer<typeof PointSchema>