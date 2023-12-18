
import 'server-only'
import { FC } from 'react'

import ChaosString from './ChaosString'
import { ChaosDictionary } from '@/lib/ChaosDictionary'
import { Point } from '@/lib/validators/Point'
import { chaosPosition, randomPosition } from '@/lib/ChaosPointAnimation'

const DEFAULT_FRAME_RATE = 24
const DEFAULT_DURATION = 8

interface ChaosWrapperProps {
  text: string
  duration?: number
  frameRate?: number
}

const ChaosWrapper: FC<ChaosWrapperProps> = async ({ text, duration = DEFAULT_DURATION, frameRate = DEFAULT_FRAME_RATE }) => {
  const frameCount = duration * frameRate

  let chaosDictionary = new ChaosDictionary()
  await chaosDictionary.fetchLetters(text)
  // console.log(chaosDictionary)

  let width = 0
  let height = 0
  text.split('').forEach((letter, index) => {
    width += chaosDictionary.get(letter)?.bounding_box.width ?? 0
    height = Math.max(height, chaosDictionary.get(letter)?.bounding_box.height ?? 0)
  })

  const animationFrames: Point[][] = []

  // Generate animation frames
  const finalAnimationFrame: Point[] = []

  let leftOffset = 0

  text.split('').forEach((letter, index) => {
    const l = chaosDictionary.get(letter) ?? { bounding_box: { width: 0, height: 0 }, points: [] }
    l.points.forEach((point) => {
      const x = point[0] + leftOffset
      finalAnimationFrame.push([x, point[1], point[2]])
    })
    leftOffset += l.bounding_box.width
  })

  const initialAnimationFrame: Point[] = []
  for (let i = 0; i < finalAnimationFrame.length; i++) {
    initialAnimationFrame.push(randomPosition(finalAnimationFrame[i], { width, height }))
  }

  text.split('').forEach((letter, index) => {
    const points = chaosDictionary.get(letter)?.points ?? []
    points.forEach((point) => {
      initialAnimationFrame.push(point)
    })
  })

  for (let i = 1; i < frameCount; i++) {
    const animationFrame: Point[] = []
    for (let j = 0; j < finalAnimationFrame.length; j++) {
      animationFrame.push(chaosPosition(initialAnimationFrame[j], finalAnimationFrame[j], i, frameCount))
    }
    animationFrames.push(animationFrame)
  }

  animationFrames.push(finalAnimationFrame)

  console.log(`Animation frame length: ${animationFrames.length}`)


  return (
    <ChaosString text={text} animationFrames={animationFrames} width={width} height={height} frameCount={frameCount} frameRate={frameRate} />
  )
}

export default ChaosWrapper