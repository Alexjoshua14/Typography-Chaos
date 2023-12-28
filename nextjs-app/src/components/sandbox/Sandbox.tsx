'use client'

import { FC, useState } from 'react'
import ChaosWrapper from '../ChaosWrapper'
import { z } from 'zod'
import { ControlForm } from './ControlForm'
import { formSchema } from '@/lib/validators/ControlForm'
import { AnimationType } from '@/lib/validators/AnimationType'

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
  const [font, setFont] = useState('Montserrat')
  const [animationType, setAnimationType] = useState<AnimationType>(AnimationType.Reverse)

  const updateFields = (fields: z.infer<typeof formSchema>) => {
    console.log(fields)
    setText(fields.text)
    setDuration(fields.duration)
    setFont(fields.font)
    setAnimationType(fields.animationType)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <ControlForm updateFields={updateFields} />
      <ChaosWrapper text={text} duration={duration} font={font} animationType={animationType} copyField />
    </div>
  )
}