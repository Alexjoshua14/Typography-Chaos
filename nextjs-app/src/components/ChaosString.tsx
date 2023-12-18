'use client'

import { getChaosCoordinates } from '@/lib/ChaosCoordinates'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import ChaosLetter from './ChaosLetter'
import { Point } from '@/lib/validators/Point'
import { ChaosCharacter } from '@/lib/validators/ChaosCharacter'
import { ChaosDictionary } from '@/lib/ChaosDictionary'
import { useAnimation } from '@/hooks/useAnimation'
import { AnimationType } from '@/lib/validators/AnimationType'


interface ChaosStringProps {
  text: string
  width: number
  height: number
  animationFrames: Point[][]
  frameCount: number
  frameRate: number
}

/**
 * Converts a text into a string of chaos letters
 * 
 * @param param0 
 * @returns 
 */
const ChaosString: FC<ChaosStringProps> = ({ text, width, height, animationFrames, frameCount, frameRate }) => {
  let animationType: AnimationType = AnimationType.Reverse

  const canvasRef = useRef<HTMLCanvasElement>(null)
  useAnimation({ canvasRef, animationFrames, frameCount, frameRate, animationType })

  return (
    <div className="relative flex w-fit">
      <canvas ref={canvasRef} width={width} height={height} />
      <div className="visually-hidden">
        {text}
      </div>
    </div>
  )
}

export default ChaosString