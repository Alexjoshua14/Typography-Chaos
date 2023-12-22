'use client'

import { FC, use, useEffect, useRef, useState } from 'react'

import ChaosString from './ChaosString'
import { ChaosDictionary } from '@/lib/ChaosDictionary'
import { Point } from '@/lib/validators/Point'
import { chaosPosition, randomPosition } from '@/lib/ChaosPointAnimation'
import { generateFrames, getBounds } from '@/lib/ChaosStringAnimation'

const DEFAULT_FRAME_RATE = 24
const DEFAULT_DURATION = 8

interface ChaosWrapperProps {
  text: string
  font?: string
  size?: number
  duration?: number
  frameRate?: number
}

/**
 * TODO: I think dict is now being handled on client,
 * might want to move it back to server 
 */
export const ChaosWrapper: FC<ChaosWrapperProps> = ({ text, font, duration = DEFAULT_DURATION, frameRate = DEFAULT_FRAME_RATE }) => {
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
    <>
      <div>
        {message}
      </div>
      <ChaosString text={message} animationFrames={animationFrames} width={width} height={height} frameCount={frameCount} frameRate={frameRate} />
    </>
  )
}

export default ChaosWrapper