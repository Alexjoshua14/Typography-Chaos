'use client'

import { FC, useEffect, useState } from 'react'
import ChaosWrapper from '../ChaosWrapper2'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,

} from '../ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { getAvailableFonts } from '@/lib/pythonAPI'

interface ControlForm {
  updateFields: (fields: z.infer<typeof formSchema>) => void
}

const formSchema = z.object({
  text: z.string().min(1, {
    message: 'Please enter some text'
  }),
  duration: z.number().positive(),
  frameRate: z.number().int().positive().default(24),
  font: z.string().default('Montserrat'),
})

/**
 * 
 * TODO: Use individual fonts for font selection previews
 * 
 * @param param0 
 * @returns 
 */
export const ControlForm: FC<ControlForm> = ({ updateFields }) => {
  const [text, setText] = useState('Hey..')
  const [duration, setDuration] = useState(8)
  const [fontOptions, setFontOptions] = useState<string[]>([])

  useEffect(() => {
    const getFonts = async () => {
      const options = await getAvailableFonts()
      setFontOptions(options)
      console.log(options)
    }

    getFonts()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formSchema.parse({
      text: 'Hello World!',
      duration: 8,
      frameRate: 24,
      font: 'Montserrat',
    })
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setText(values.text)
    setDuration(values.duration)
    updateFields(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Text
              </FormLabel>
              <FormControl>
                <Input placeholder='Hello' {...field} />
              </FormControl>
              <FormDescription>
                The text to animate
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="font"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Font
              </FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                The font to use
              </FormDescription>
            </FormItem>
          )}
        />
        {/* <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Duration
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode='decimal'
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The duration of the animation in seconds
                  {form.formState.errors.duration?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frameRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Frame Rate
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode='decimal'
                    min={0}
                    step={1}
                    placeholder='24'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The frame rate of the animation in frames per second
                </FormDescription>
              </FormItem>
            )}
          /> */}
        <Button type="submit">Animate</Button>
      </form>
    </Form>
  )
}