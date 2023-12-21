// Handle the animation of a given chaos string

import { Point } from '@/lib/validators/Point'
import { ChaosDictionary } from './ChaosDictionary'
import { chaosPosition, randomPosition } from './ChaosPointAnimation'

/**
 * Generates a frame of points for the given message
 * where each point is exactly where it should be
 * 
 * @param chaosDictionary 
 * @param message 
 * @returns 
 */
export const getTrueAnimationFrame = (chaosDictionary: ChaosDictionary, message: String) => {
  let trueFrame: Point[] = []
  
  let leftOffset = 0

  message.split('').forEach((letter, index) => {
    const l = chaosDictionary.get(letter) ?? { bounding_box: { width: 0, height: 0 }, points: [] }
    l.points.forEach((point) => {
      const x = point[0] + leftOffset
      trueFrame.push([x, point[1], point[2]])
    })
    leftOffset += l.bounding_box.width
  })

  return trueFrame
}

/**
 * Returns the width of the given word
 * 
 * @param chaosDictionary 
 * @param word 
 * @returns 
 */
const wordWidth = (chaosDictionary: ChaosDictionary, word: String) => {
  let width = 0

  word.split('').forEach((letter) => {
    const l = chaosDictionary.get(letter) ?? { bounding_box: { width: 0, height: 0 }, points: [] }
    width += l.bounding_box.width
  })
  
  return width
}

export const getTrueAnimationFrameWithWrap = (chaosDictionary: ChaosDictionary, message: String, w: number) => {
  let trueFrame: Point[] = []
  
  let leftOffset = 0
  let topOffset = 0

  message.split(' ').forEach((word, index) => {
    const width = wordWidth(chaosDictionary, word)
    if (leftOffset + width > w) {
      leftOffset = 0
      topOffset += 94 // TODO: Make this dynamic
    }

    word.split('').forEach((letter) => {
      const l = chaosDictionary.get(letter) ?? { bounding_box: { width: 0, height: 0 }, points: [] }
      l.points.forEach((point) => {
        const x = point[0] + leftOffset
        const y = point[1] + topOffset
        trueFrame.push([x, y, point[2]])
      })
      leftOffset += l.bounding_box.width
    })

    leftOffset += chaosDictionary.get(' ')?.bounding_box.width ?? 10 // TODO: Move this to a more constant location
  })

  return {trueFrame, width: leftOffset, height: topOffset + 94} // TODO: Adjust this when topOffset value is corrected
}


/**
 * Generates a randomized frame where each 
 * point is within the bounds of the canvas
 * 
 * @param w 
 * @param h 
 */
export const getInitialAnimationFrame = (w: number, h: number, message: String, trueAnimationFrame: Point[], chaosDictionary: ChaosDictionary) => {
  let initialAnimationFrame: Point[] = []

  for (let i = 0; i < trueAnimationFrame.length; i++) {
    initialAnimationFrame.push(randomPosition(trueAnimationFrame[i], { width: w, height: h }))
  }

  message.split('').forEach((letter, index) => {
    const points = chaosDictionary.get(letter)?.points ?? []
    points.forEach((point) => {
      initialAnimationFrame.push(point)
    })
  })

  return initialAnimationFrame
}

export const fillInFrames = (frameCount: number, initialFrame: Point[], finalFrame: Point[], ) => {
  let inbetweenFrames: Point[][] = []

  for (let i = 1; i < frameCount; i++) {
    const animationFrame: Point[] = []
    for (let j = 0; j < finalFrame.length; j++) {
      animationFrame.push(chaosPosition(initialFrame[j], finalFrame[j], i, frameCount))
    }
    
    inbetweenFrames.push(animationFrame)
  }

  return inbetweenFrames
}

export const generateFrames = (w: number, h: number, message: String, chaosDictionary: ChaosDictionary, frameCount: number) => {
  const trueAnimationFrame = getTrueAnimationFrame(chaosDictionary, message)
  const initialAnimationFrame = getInitialAnimationFrame(w, h, message, trueAnimationFrame, chaosDictionary)

  const inbetweenFrames = fillInFrames(frameCount, initialAnimationFrame, trueAnimationFrame)

  return [initialAnimationFrame, ...inbetweenFrames, trueAnimationFrame]
}