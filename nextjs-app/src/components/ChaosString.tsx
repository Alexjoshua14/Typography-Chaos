'use client'

import { FC, useRef } from 'react'
import { Point } from '@/lib/validators/Point'
import { useAnimation } from '@/hooks/useAnimation'
import { AnimationType } from '@/lib/validators/AnimationType'
import Canvas from './Canvas'

interface ChaosStringProps {
  text: string
  width: number
  height: number
  animationType?: AnimationType
  animationFrames: Point[][]
  frameCount: number
  frameRate: number
  currFrame?: number
  repeatDelay?: number
}

/**
 * Converts a text into a string of chaos letters
 * 
 * @param param0 
 * @returns 
 */
const ChaosString: FC<ChaosStringProps> = ({ text, width, height, animationFrames, frameCount, frameRate, animationType = AnimationType.Reverse, currFrame = frameCount - 1, repeatDelay }) => {
  if (animationType === AnimationType.Manual && currFrame === undefined) {
    console.error("AnimationType.Manual requires currFrame to be defined. Defaulting to AnimationType.Reverse")
    animationType = AnimationType.Reverse
  }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentFrame } = useAnimation({ canvasRef, animationFrames, frameCount, frameRate, animationType, repeatDelay })

  return (
    <div className="relative flex w-fit">
      <Canvas animationFrames={animationFrames} currentFrame={animationType === AnimationType.Manual ? currFrame : currentFrame} width={width} height={height} animationType={animationType} />
      <div className="visually-hidden">
        {text}
      </div>
    </div>
  )
}

export default ChaosString