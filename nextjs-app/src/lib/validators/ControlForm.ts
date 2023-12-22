import { z } from "zod"

export const formSchema = z.object({
  text: z.string().min(1, {
    message: 'Please enter some text'
  }),
  duration: z.number().positive(),
  frameRate: z.number().int().positive().default(24),
  font: z.string().default('Montserrat'),
})