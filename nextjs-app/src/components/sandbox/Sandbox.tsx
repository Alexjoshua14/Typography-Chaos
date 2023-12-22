'use client'

import { FC, useState } from 'react'
import ChaosWrapper from '../ChaosWrapper2'
import { z } from 'zod'
import { ControlForm } from './ControlForm'
import { formSchema } from '@/lib/validators/ControlForm'

interface SandboxProps {

}

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