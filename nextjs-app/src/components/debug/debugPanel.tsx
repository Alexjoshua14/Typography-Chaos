'use client'

import { FC, use, useEffect, useState } from "react"
import { ControlForm } from "../sandbox/ControlForm"
import ChaosWrapper from "../ChaosWrapper"
import DebugChaosWrapper from "./debugChaosWrapper"
import { AnimationType } from "@/lib/validators/AnimationType"

interface DebugPanelProps {

}

/**
 * Displays a chaos message and allows the user to 
 * change the message, font, frame count, frame rate, 
 * and scrub through the frames
 * 
 */
export const DebugPanel: FC<DebugPanelProps> = ({ }) => {
  const [text, setText] = useState('Debugging')
  const [font, setFont] = useState('')
  const [duration, setDuration] = useState(8)
  const [animationType, setAnimationType] = useState<AnimationType>(AnimationType.Reverse)
  // const [frameRate, setFrameRate] = useState(24)

  const updateFields = (fields: any) => {
    setText(fields.text)
    setFont(fields.font)
    setDuration(fields.duration)
    try {
      setAnimationType(fields.animationType)
    } catch (err) {
      console.error(err)
    }

    // setFrameRate(fields.frameRate)
    // setFont(fields.font)
  }

  return (
    <div className="min-w-[340px] w-fit max-w-[700px] p-5 flex flex-col items-center justify-center gap-4 border-2 bg-white/30 backdrop-blur rounded">
      <h2 className="text-2xl">Debug Panel</h2>
      <ControlForm updateFields={updateFields} />
      <DebugChaosWrapper text={text} duration={duration} frameRate={24} animationType={animationType} />
    </div>
  )
}