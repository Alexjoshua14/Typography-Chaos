'use client'

import { FC, useEffect, useState } from 'react'
import ChaosWrapper from '../ChaosWrapper'
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
import { AnimationType } from '@/lib/validators/AnimationType'
import { formSchema } from '@/lib/validators/ControlForm'

interface ControlForm {
  updateFields: (fields: z.infer<typeof formSchema>) => void
}

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
  const [animationType, setAnimationType] = useState<AnimationType>(AnimationType.Reverse)

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
      text: 'Debug..',
      duration: 8,
      frameRate: 24,
      font: 'Montserrat',
      animationType: AnimationType.Reverse
    })
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setText(values.text)
    setDuration(values.duration)
    setAnimationType(values.animationType)
    updateFields(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid grid-flow-row gap-x-8 gap-y-4 grid-cols-2 w-[540px] border-2 p-4 rounded-lg">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="col-span-2">
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>{font.replace("_", " ")}</SelectItem>
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
          <FormField
            control={form.control}
            name="animationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Animation Type
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an animation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(AnimationType).map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  The type of animation to use
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
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
                    pattern="[0-9]*.?[0-9]+"
                    inputMode='numeric'
                    min={0}
                    step={.01}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {`The duration of the animation in seconds`}
                  {`${form.formState.errors.duration?.message}`}
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
          />
        </div>
        <Button type="submit">Animate</Button>
      </form>
    </Form>
  )
}