'use client'

import { FC, use, useEffect, useRef, useState } from 'react'

import ChaosString from './ChaosString'
import { ChaosDictionary } from '@/lib/ChaosDictionary'
import { Point } from '@/lib/validators/Point'
import { generateFrames, getBounds } from '@/lib/ChaosStringAnimation'
import { AnimationType } from '@/lib/validators/AnimationType'

const DEFAULT_FRAME_RATE = 24
const DEFAULT_DURATION = 8

interface ChaosWrapperProps {
  text: string
  font?: String
  size?: number
  duration?: number
  frameRate?: number
  animationType?: AnimationType
  currentFrame?: number
  repeatDelay?: number
}

/**
 * TODO: I think dict is now being handled on client,
 * might want to move it back to server 
 */
export const ChaosWrapper: FC<ChaosWrapperProps> = ({ text, font, animationType, duration = DEFAULT_DURATION, frameRate = DEFAULT_FRAME_RATE, currentFrame, repeatDelay }) => {
  const [frameCount, setFrameCount] = useState(duration * frameRate)
  const chaosDictionary = useRef(new ChaosDictionary())
  const [message, setMessage] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [animationFrames, setAnimationFrames] = useState<Point[][]>([])

  /**
   * Fetch any new letters and then update the message
   */
  useEffect(() => {
    const getLetters = async () => {
      await chaosDictionary.current.fetchLetters(text)
      setMessage(text)
    }
    getLetters()
  }, [text])

  useEffect(() => {
    console.log("Updating font")
    const updateFont = async () => {
      if (!font) return

      console.log("Calling for dict to update font")
      console.log("Dictionary: " + chaosDictionary.current.toString())
      await chaosDictionary.current.setFont(font)
      console.log("Font updated (?)")
    }

    updateFont()
  }, [font])

  /**
   * Update frame count when duration or frame rate changes
   */
  useEffect(() => {
    setFrameCount(duration * frameRate)
  }, [duration, frameRate])


  /** 
   * Generate animation frames when any of the following change:
   * - message
   * - font
   * - frame count
   */
  useEffect(() => {
    console.log("Generating frames")
    let bounds = getBounds(chaosDictionary.current, message)
    setWidth(bounds.w)
    setHeight(bounds.h)

    let frames = generateFrames(bounds.w, bounds.h, message, chaosDictionary.current, frameCount)
    setAnimationFrames(frames)
  }, [message, frameCount])

  console.log("Rendering ChaosWrapper with Animation Type: " + animationType)

  return (
    <ChaosString
      text={message}
      animationFrames={animationFrames}
      width={width} height={height}
      frameCount={frameCount} frameRate={frameRate}
      animationType={animationType}
      currFrame={animationType === AnimationType.Manual ? currentFrame : undefined}
      repeatDelay={repeatDelay}
    />
  )
}

export default ChaosWrapper