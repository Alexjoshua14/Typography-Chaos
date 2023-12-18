
import { FC, useEffect, useRef, useState } from 'react'
import { AnimationType } from '@/lib/validators/AnimationType'
import { Point } from '@/lib/validators/Point'

interface AnimationProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  animationFrames: Point[][]
  frameCount: number
  frameRate: number
  animationType?: AnimationType
}

/**
 * Custom hook for handling animation
 * 
 * @param canvasRef - Reference to canvas element
 * @param animationFrames - Array of animation frames
 * @param frameCount - Number of frames in animation
 * @param frameRate - Number of frames per second
 * @param animationType - Type of animation
 * @returns 
 */
export const useAnimation  = ({canvasRef, animationFrames, frameCount, frameRate, animationType = AnimationType.Loop }: AnimationProps) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalID = useRef<NodeJS.Timeout>()

  // Draw points onto canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    // Plot points from current animation frame onto canvas
    if (canvas && ctx && animationFrames.length > 0) {
      // console.log("Drawing points")
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#a864fd'

      animationFrames[currentFrame].forEach((point) => {
        ctx.beginPath()
        ctx.arc(point[0], point[1], 1, 0, 2 * Math.PI)
        ctx.fill()
      })
    }
  }, [animationFrames, currentFrame, canvasRef])

  // Handle ending events for animation types
  useEffect(() => {
    const handleEndingEvents = () => {
      if (animationType === AnimationType.Once && currentFrame === frameCount - 1) {
        clearInterval(intervalID.current)
      } else if (animationType === AnimationType.Reverse) {
        if (currentFrame === 1 && direction === -1) {
            // console.log("Reverse direction " + currentFrame)
            setDirection(1)
          } else if (currentFrame === frameCount - 2 && direction === 1) {
            // console.log("Reverse direction " + currentFrame)
            setDirection(-1)
          }
      }
    }

    handleEndingEvents()
    
  }, [animationType, currentFrame, frameCount, direction])

  // Handle animation frame changes
  useEffect(() => {
    const handleAnimationFrameChange = () => {
      if (animationType === AnimationType.Loop) {
        setCurrentFrame(prev => (prev + 1) % frameCount)
      } else if (animationType === AnimationType.Reverse) {
        setCurrentFrame(prev => (prev + direction))
      } else {
        setCurrentFrame(prev => (prev + 1))
      }
    }

    intervalID.current = setInterval(handleAnimationFrameChange, 1000 / frameRate)

    return () => {
      clearInterval(intervalID.current)
    }

  }, [animationType, frameCount, frameRate, direction])

  return { }
}