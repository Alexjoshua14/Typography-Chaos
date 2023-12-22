
import { FC, useEffect, useRef, useState } from 'react'
import { ChaosDictionary } from '@/lib/ChaosDictionary'
import { getBounds, generateFrames } from '@/lib/ChaosStringAnimation'
import { Point } from '@/lib/validators/Point'
import DebugChaosString from './debugChaosString'
import { AnimationType } from '@/lib/validators/AnimationType'

interface DebugChaosWrapperProps {
  text: string
  duration?: number
  frameRate?: number
  font?: string
  animationType?: AnimationType
}

/**
 * Allows for debugging the animation
 * 
 * @param param0 
 * @returns 
 */
const DebugChaosWrapper: FC<DebugChaosWrapperProps> = ({ text, duration = 1, frameRate = 1, font, animationType }) => {
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



  return (
    <DebugChaosString text={text} width={width} height={height} animationFrames={animationFrames} frameCount={frameCount} frameRate={frameRate} animationType={animationType} />
  )
}

export default DebugChaosWrapper