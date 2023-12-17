import { z } from "zod";

export const BoundingBoxSchema = z.object({
  width: z.number(),
  height: z.number(),
});

export type BoundingBox = z.infer<typeof BoundingBoxSchema>