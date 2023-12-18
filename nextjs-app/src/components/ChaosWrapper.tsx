
import 'server-only'
import { FC } from 'react'

import ChaosString from './ChaosString'
import { ChaosDictionary } from '@/lib/ChaosDictionary'
import { Point } from '@/lib/validators/Point'
import { chaosPosition, randomPosition } from '@/lib/ChaosPointAnimation'

const FRAME_RATE = 24
const FRAME_COUNT = FRAME_RATE * 8

interface ChaosWrapperProps {
  text: string
}

const ChaosWrapper: FC<ChaosWrapperProps> = async ({ text }) => {
  let chaosDictionary = new ChaosDictionary()
  await chaosDictionary.fetchLetters(text)
  console.log(chaosDictionary)

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

  for (let i = 1; i < FRAME_COUNT; i++) {
    const animationFrame: Point[] = []
    for (let j = 0; j < finalAnimationFrame.length; j++) {
      animationFrame.push(chaosPosition(initialAnimationFrame[j], finalAnimationFrame[j], i, FRAME_COUNT))
    }
    animationFrames.push(animationFrame)
  }

  animationFrames.push(finalAnimationFrame)

  console.log(`Animation frame length: ${animationFrames.length}`)


  return (
    <ChaosString text={text} animationFrames={animationFrames} width={width} height={height} frameCount={FRAME_COUNT} frameRate={FRAME_RATE} />
  )
}

export default ChaosWrapper