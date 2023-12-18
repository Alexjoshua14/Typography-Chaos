'use client'

import { getChaosCoordinates } from '@/lib/ChaosCoordinates'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import ChaosLetter from './ChaosLetter'
import { Point } from '@/lib/validators/Point'
import { ChaosCharacter } from '@/lib/validators/ChaosCharacter'
import { ChaosDictionary } from '@/lib/ChaosDictionary'

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

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  const intervalID: MutableRefObject<NodeJS.Timeout | null> = useRef(null)

  // Plot points based on animation frame
  // Runs if animationFrames or currentFrame changes
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    // Plot points from current animation frame onto canvas
    if (canvas && ctx && animationFrames.length > 0) {
      console.log("Drawing points")
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#a864fd'

      animationFrames[currentFrame].forEach((point) => {
        ctx.beginPath()
        ctx.arc(point[0], point[1], 1, 0, 2 * Math.PI)
        ctx.fill()
      })
    }
  }, [animationFrames, currentFrame])

  useEffect(() => {
    intervalID.current = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % frameCount)
    }, 1000 / frameRate)

    return () => {
      if (intervalID.current) {
        clearInterval(intervalID.current)
      }
    }
  })

  return (
    <div className="flex w-fit">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  )
}

export default ChaosString