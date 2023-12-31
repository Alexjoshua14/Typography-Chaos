
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimationType } from '@/lib/validators/AnimationType'
import { Point } from '@/lib/validators/Point'
import { delayRepeat } from '@/lib/AnimationUtils'

interface AnimationProps {
  canvasRef?: React.RefObject<HTMLCanvasElement | null>
  animationFrames?: Point[][]
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
export const useAnimation  = ({ frameCount, frameRate, animationType = AnimationType.Loop, repeatDelay = 2000 }: AnimationProps) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalID = useRef<NodeJS.Timeout>()

  const [isPlaying, setIsPlaying] = useState(true)

  /**
   * For when animation reaches final frame
   */
  const handleEndEvent = useCallback(() => {
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
  }, [animationType, direction, frameCount, repeatDelay])

  /**
   * For when animation returns to beginning
   */
  const handleBeginningEvent = useCallback(() => {
    clearInterval(intervalID.current)
          intervalID.current = undefined
          
    if (animationType === AnimationType.Reverse && direction === -1) {
      clearInterval(intervalID.current)
      intervalID.current = undefined
      delayRepeat(() => setDirection(prev => prev * -1), repeatDelay)
    }
  }, [animationType, direction, repeatDelay])

  const handleEndingEvents = useCallback(() => {
    if (currentFrame === frameCount - 1) {
      handleEndEvent()
    } else if (currentFrame === 0) {
      handleBeginningEvent()
    }
  }, [currentFrame, frameCount, handleEndEvent, handleBeginningEvent])

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
    if (isPlaying)
      handleEndingEvents()
    
  }, [isPlaying, currentFrame, handleEndingEvents])

  /**
   * Change animation frame based on animation type
   * 
   * Cases:
   * - Once & Loop: Increment frame by 1
   * - Reverse: Increment frame by current direction
   */
  useEffect(() => {
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

  }, [animationType, frameRate, direction, isPlaying])


  /**
   * Stop animation
   */
  const stop = useCallback(() => {
    setIsPlaying(false)
    clearInterval(intervalID.current)
    intervalID.current = undefined
  }, [])

  /**
   * Start animation
   */
  const start = useCallback(() => {
    setIsPlaying(true)
    if (currentFrame === frameCount - 1 || currentFrame === 0) {
      handleEndingEvents()
    }
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
  }, [animationType, direction, frameRate, handleEndingEvents, currentFrame, frameCount ])

  const togglePlayback = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const seek = useCallback((frame: number) => {
    setCurrentFrame(frame)
  }, [])

  const nextFrame = useCallback(() => {
    setCurrentFrame(prev => Math.min(prev + 1, frameCount - 1))
    
  }, [frameCount])

  const prevFrame = useCallback(() => {
    setCurrentFrame(prev => Math.max(prev - 1, 0))
  }, [])

  return { currentFrame, start, stop, togglePlayback, seek, nextFrame, prevFrame, isPlaying }
}