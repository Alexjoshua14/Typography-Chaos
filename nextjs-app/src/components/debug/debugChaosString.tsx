'use client'

import { FC, useRef } from 'react'
import { Point } from '@/lib/validators/Point'
import { useAnimation } from '@/hooks/useAnimation'
import { AnimationType } from '@/lib/validators/AnimationType'

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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentFrame, start, stop, seek, nextFrame, prevFrame } = useAnimation({ canvasRef, animationFrames, frameCount, frameRate, animationType })

  return (
    <div className="relative flex flex-col w-fit items-center justify-center">
      <canvas ref={canvasRef} width={width} height={height} />
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