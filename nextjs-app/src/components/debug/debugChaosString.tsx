'use client'

import { FC, useCallback, useEffect, useRef } from 'react'
import { Point } from '@/lib/validators/Point'
import { useAnimation } from '@/hooks/useAnimation'
import { AnimationType } from '@/lib/validators/AnimationType'
import Canvas from '../Canvas'

interface DebugChaosStringProps {
  text: string
  width: number
  height: number
  animationFrames: Point[][]
  frameCount: number
  frameRate: number
  animationType?: AnimationType
}

/**
 * Converts a text into a string of chaos letters
 * 
 * @param param0 
 * @returns 
 */
const DebugChaosString: FC<DebugChaosStringProps> = ({ text, width, height, animationFrames, frameCount, frameRate, animationType = AnimationType.Reverse }) => {
  const { currentFrame, start, stop, togglePlayback, seek, nextFrame, prevFrame, isPlaying } = useAnimation({ frameCount, frameRate, animationType })

  const containerRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault()
    switch (e.key) {
      case ' ':
        // pause
        togglePlayback
        break
      case 'ArrowLeft':
        prevFrame()
        // previous frame
        break
      case 'ArrowRight':
        nextFrame()
        // next frame
        break
      default:
        break
    }
  }, [togglePlayback, prevFrame, nextFrame])

  /**
 * Watch for key presses
 * on spacebar, pause the animation
 * on left/right arrow, go to previous/next frame
 */
  useEffect(() => {
    const container = containerRef.current

    const handleFocus = () => {
      console.log('focus')
      window.addEventListener('keydown', handleKeyDown)
    }

    const handleBlur = () => {
      console.log('blur')
      window.removeEventListener('keydown', handleKeyDown)
    }

    container?.addEventListener('focus', handleFocus)
    container?.addEventListener('blur', handleBlur)

    return () => {
      console.log('cleanup')
      container?.removeEventListener('focus', handleFocus)
      container?.removeEventListener('blur', handleBlur)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="relative flex flex-col w-fit items-center justify-center" ref={containerRef} tabIndex={0}>
      <div className="border-2 border-pink-400">
        <Canvas currentFrame={currentFrame} animationFrames={animationFrames} width={width} height={height} />
      </div>
      <div aria-description='Animation Control Panel'>
        <div className="flex gap-6 items-center justify-center h-14">
          <button onClick={prevFrame}>
            {`<`}
          </button>
          <div className="flex gap-2 items-center justify-center">
            <button onClick={start}>
              {`▶`}
            </button>
            <button onClick={stop}>
              {`◼`}
            </button>
          </div>
          <button onClick={nextFrame}>
            {`>`}
          </button>
        </div>
        <input type="range" value={currentFrame} min={0} max={frameCount} step={1} onChange={(e) => seek(parseInt(e.target.value))} />
      </div>
      <div className="visually-hidden">
        {text}
      </div>
    </div>
  )
}

export default DebugChaosString