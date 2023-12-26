'use client'

import { AnimationType } from '@/lib/validators/AnimationType'
import { Point } from '@/lib/validators/Point'
import { FC, useEffect, useMemo, useRef } from 'react'

interface CanvasProps {
  currentFrame: number
  animationFrames: Point[][]
  width: number
  height: number
  animationType?: AnimationType
}

const Canvas: FC<CanvasProps> = ({ currentFrame, animationFrames, width, height, animationType }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /**
   * Draw points from current animation frame onto canvas
   */
  useEffect(() => {
    try {
      const ctx = canvasRef.current?.getContext('2d')
      // Plot points from current animation frame onto canvas
      if (ctx && animationFrames.length > 0) {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = '#a864fd'

        animationFrames[currentFrame].forEach((point) => {
          ctx.beginPath()
          ctx.arc(point[0], point[1], 1, 0, 2 * Math.PI)
          ctx.fill()
        })
      }
    } catch (err) {
      // If the error is that we passed the bounds of the array,
      // then we should just draw the last frame
      if (err instanceof TypeError) {
        const ctx = canvasRef.current?.getContext('2d')
        // Plot points from current animation frame onto canvas
        if (ctx && animationFrames.length > 0) {
          ctx.clearRect(0, 0, width, height)
          ctx.fillStyle = '#a864fd'

          animationFrames[animationFrames.length - 1].forEach((point) => {
            ctx.beginPath()
            ctx.arc(point[0], point[1], 1, 0, 2 * Math.PI)
            ctx.fill()
          })
        }
      } else {
        console.error(err)
      }
    }
  }, [animationFrames, currentFrame, width, height, animationType])

  return (
    <canvas ref={canvasRef} width={width} height={height} />
  )
}

export default Canvas