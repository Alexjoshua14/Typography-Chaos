import { z } from "zod"
import { AnimationType } from "./AnimationType"

export const formSchema = z.object({
  text: z.string().min(1, {
    message: 'Please enter some text'
  }),
  duration: z.coerce.number().positive().default(8),
  frameRate: z.coerce.number().int().positive().default(24),
  font: z.string().default('Montserrat'),
  animationType: z.nativeEnum(AnimationType).default(AnimationType.Reverse)
})