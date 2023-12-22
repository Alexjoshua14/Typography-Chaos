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
import { ControlForm } from './ControlForm'

interface SandboxProps {

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
export const Sandbox: FC<SandboxProps> = ({ }) => {
  const [text, setText] = useState('Hey..')
  const [duration, setDuration] = useState(8)
  const [fontOptions, setFontOptions] = useState<string[]>([])

  const updateFields = (fields: z.infer<typeof formSchema>) => {
    setText(fields.text)
    setDuration(fields.duration)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <ControlForm updateFields={updateFields} />
      <ChaosWrapper text={text} duration={duration} />
    </div>
  )
}