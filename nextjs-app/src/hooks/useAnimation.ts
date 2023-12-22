
import { Context, FC, useEffect, useRef, useState } from 'react'
import { AnimationType } from '@/lib/validators/AnimationType'
import { Point } from '@/lib/validators/Point'
import { clear } from 'console'
import { delayRepeat } from '@/lib/AnimationUtils'

interface AnimationProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  animationFrames: Point[][]
  frameCount: number
  frameRate: number
  animationType?: AnimationType
  repeatDelay?: number
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
export const useAnimation  = ({canvasRef, animationFrames, frameCount, frameRate, animationType = AnimationType.Loop, repeatDelay = 2000 }: AnimationProps) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalID = useRef<NodeJS.Timeout>()

  const [isPlaying, setIsPlaying] = useState(true)

  /**
   * Draw points from current animation frame onto canvas
   */
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

  /**
   * Handle animation ending events. 
   * 
   * If animation is of a repeating type,
   * animation will be repeated after a delay, animationDelay.  
   * 
   * 
   * Cases:
   *  - Once: Stop animation when last frame is reached
   *  - Reverse: Reverse direction when first or last frame is reached
   *  - Loop: Repeat animation when last frame is reached
   * 
   */
  useEffect(() => {
    const handleEndingEvents = () => {
      if (currentFrame === frameCount - 1) {
        // Stop interval
        clearInterval(intervalID.current)
          intervalID.current = undefined

        if (animationType === AnimationType.Once) {
          setIsPlaying(false)
          setCurrentFrame(frameCount - 1)
        } else if (direction === 1 && animationType === AnimationType.Reverse) {
          delayRepeat(() => setDirection(prev => prev * -1), repeatDelay)
        } else if (animationType === AnimationType.Loop) {
          delayRepeat(() => setCurrentFrame(0), repeatDelay)
        }
      } else if (currentFrame === 0) {
        if (animationType === AnimationType.Reverse && direction === -1) {
          clearInterval(intervalID.current)
          intervalID.current = undefined
          delayRepeat(() => setDirection(prev => prev * -1), repeatDelay)
        }
      }
    }

    if (isPlaying)
      handleEndingEvents()
    
  }, [animationType, currentFrame, frameCount, direction, repeatDelay, isPlaying])

  /**
   * Change animation frame based on animation type
   * 
   * Cases:
   * - Once & Loop: Increment frame by 1
   * - Reverse: Increment frame by current direction
   */
  useEffect(() => {
    console.log("Animation type: ", animationType)
    const handleAnimationFrameChange = () => {
      if (animationType === AnimationType.Loop) {
        setCurrentFrame(prev => prev + 1)
      } else if (animationType === AnimationType.Reverse) {
        setCurrentFrame(prev => (prev + direction))
      } else {
        setCurrentFrame(prev => (prev + 1))
      }
    }

    if (isPlaying)
      intervalID.current = setInterval(handleAnimationFrameChange, 1000 / frameRate)

    return () => {
      clearInterval(intervalID.current)
    }

  }, [animationType, frameCount, frameRate, direction, isPlaying])

  /**
   * Stop animation
   */
  const stop = () => {
    setIsPlaying(false)
    clearInterval(intervalID.current)
    intervalID.current = undefined
  }

  /**
   * Start animation
   */
  const start = () => {
    setIsPlaying(true)
    if (intervalID.current === undefined) {
      intervalID.current = setInterval(() => {
        if (animationType === AnimationType.Loop) {
          setCurrentFrame(prev => prev + 1)
        } else if (animationType === AnimationType.Reverse) {
          setCurrentFrame(prev => (prev + direction))
        } else {
          setCurrentFrame(prev => (prev + 1))
        }
      }, 1000 / frameRate)
    }
  }

  const seek = (frame: number) => {
    setCurrentFrame(frame)
  }

  const nextFrame = () => {
    setCurrentFrame(prev => prev + 1)
  }

  const prevFrame = () => {
    setCurrentFrame(prev => prev - 1)
  }

  return { currentFrame, start, stop, seek, nextFrame, prevFrame }
}