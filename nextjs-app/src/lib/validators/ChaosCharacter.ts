import { z } from "zod";
import { BoundingBoxSchema } from "./BoundingBox";
import { PointSchema } from "./Point";


export const ChaosCharacterSchema = z.object({
  bounding_box: BoundingBoxSchema,
  // letter: z.string(),
  points: z.array(PointSchema),
});

export type ChaosCharacter = z.infer<typeof ChaosCharacterSchema>