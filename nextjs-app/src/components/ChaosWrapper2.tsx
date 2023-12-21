'use client'

import { FC, use, useEffect, useRef, useState } from 'react'

import ChaosString from './ChaosString'
import { ChaosDictionary } from '@/lib/ChaosDictionary'
import { Point } from '@/lib/validators/Point'
import { chaosPosition, randomPosition } from '@/lib/ChaosPointAnimation'

const DEFAULT_FRAME_RATE = 24
const DEFAULT_DURATION = 8

interface ChaosWrapperProps {
  text: string
  font?: string
  size?: number
  duration?: number
  frameRate?: number
}

/**
 * TODO: I think dict is now being handled on client,
 * might want to move it back to server 
 */
export const ChaosWrapper: FC<ChaosWrapperProps> = ({ text, font, duration = DEFAULT_DURATION, frameRate = DEFAULT_FRAME_RATE }) => {
  const [frameCount, setFrameCount] = useState(duration * frameRate)
  const chaosDictionary = useRef(new ChaosDictionary())
  const [message, setMessage] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [animationFrames, setAnimationFrames] = useState<Point[][]>([])

  /**
   * Fetch any new letters and then update the message
   */
  useEffect(() => {
    const getLetters = async () => {
      await chaosDictionary.current.fetchLetters(text)
      setMessage(text)
    }
    getLetters()
  }, [text])

  /**
   * Update frame count when duration or frame rate changes
   */
  useEffect(() => {
    setFrameCount(duration * frameRate)
  }, [duration, frameRate])


  /** TODO: Hotswap these pieces with modular counterparts
   * Generate animation frames when any of the following change:
   * - message
   * - font
   * - frame count
   * - duration
   */
  useEffect(() => {
    let initialAnimationFrame: Point[] = []
    let inbetweenFrames: Point[][] = []
    let finalAnimationFrame: Point[] = []

    const getBounds = () => {
      let w = 0
      let h = 0

      message.split('').forEach((letter, index) => {
        w += chaosDictionary.current.get(letter)?.bounding_box.width ?? 0
        h = Math.max(h, chaosDictionary.current.get(letter)?.bounding_box.height ?? 0)
      })

      setWidth(w)
      setHeight(h)
      return { w, h }
    }

    const getFinalAnimationFrame = () => {
      let leftOffset = 0

      message.split('').forEach((letter, index) => {
        const l = chaosDictionary.current.get(letter) ?? { bounding_box: { width: 0, height: 0 }, points: [] }
        l.points.forEach((point) => {
          const x = point[0] + leftOffset
          finalAnimationFrame.push([x, point[1], point[2]])
        })
        leftOffset += l.bounding_box.width
      })
    }

    const getInitialAnimationFrame = (w: number, h: number) => {
      for (let i = 0; i < finalAnimationFrame.length; i++) {
        initialAnimationFrame.push(randomPosition(finalAnimationFrame[i], { width: w, height: h }))
      }

      message.split('').forEach((letter, index) => {
        const points = chaosDictionary.current.get(letter)?.points ?? []
        points.forEach((point) => {
          initialAnimationFrame.push(point)
        })
      })
    }

    const fillInFrames = () => {
      for (let i = 1; i < frameCount; i++) {
        const animationFrame: Point[] = []
        for (let j = 0; j < finalAnimationFrame.length; j++) {
          animationFrame.push(chaosPosition(initialAnimationFrame[j], finalAnimationFrame[j], i, frameCount))
        }
        inbetweenFrames.push(animationFrame)
      }
    }

    const { w, h } = getBounds()
    getFinalAnimationFrame()
    getInitialAnimationFrame(w, h)
    fillInFrames()
    setAnimationFrames([initialAnimationFrame, ...inbetweenFrames, finalAnimationFrame])
  }, [message, frameCount])

  return (
    <>
      <div>
        {message}
      </div>
      <ChaosString text={message} animationFrames={animationFrames} width={width} height={height} frameCount={frameCount} frameRate={frameRate} />
    </>
  )
}

export default ChaosWrapper