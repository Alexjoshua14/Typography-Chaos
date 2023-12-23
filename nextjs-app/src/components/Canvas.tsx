'use client'

import { Point } from '@/lib/validators/Point'
import { FC, useEffect, useMemo, useRef } from 'react'

interface CanvasProps {
  currentFrame: number
  animationFrames: Point[][]
  width: number
  height: number
}

const Canvas: FC<CanvasProps> = ({ currentFrame, animationFrames, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /**
   * Draw points from current animation frame onto canvas
   */
  useEffect(() => {
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
  }, [animationFrames, currentFrame, width, height])

  return (
    <canvas ref={canvasRef} width={width} height={height} />
  )
}

export default Canvas