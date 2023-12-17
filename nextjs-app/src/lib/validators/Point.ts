import { z } from "zod";

export const PointSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number().optional(),
});

export type Point = z.infer<typeof PointSchema>