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

/**
 * Generates a frame of points for the given message
 * where each point is exactly where it should be
 * This version wraps the text to the given width
 * 
 * @param chaosDictionary - The dictionary of chaos characters
 * @param message - The message to be displayed
 * @param w - The width of the canvas
 * @param leading - The height of a line of text as a multiple of the font size
 * @returns 
 */
export const getTrueAnimationFrameWithWrap = (chaosDictionary: ChaosDictionary, message: String, w: number, leading?: number) => {
  let trueFrame: Point[] = []
  
  let leftOffset = 0
  let topOffset = 0
  let lineHeight = (leading ?? 1.2) * 94 // TODO: Make this dynamic
  let spaceWidth = chaosDictionary.get(' ')?.bounding_box.width ?? 10

  message.split(' ').forEach((word, index) => {
    const width = wordWidth(chaosDictionary, word)
    if (leftOffset + width > w) {
      leftOffset = 0
      topOffset += lineHeight
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

    leftOffset += spaceWidth
  })

  return {trueFrame, width: leftOffset, height: topOffset + lineHeight}
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

/**
 * Interpolates between the initial and final frames
 * 
 * @param frameCount 
 * @param initialFrame 
 * @param finalFrame 
 * @returns 
 */
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

/**
 * Generates a list of frames for the given message
 * 
 * @param w 
 * @param h 
 * @param message 
 * @param chaosDictionary 
 * @param frameCount 
 * @returns 
 */
export const generateFrames = (w: number, h: number, message: String, chaosDictionary: ChaosDictionary, frameCount: number) => {
  const trueAnimationFrame = getTrueAnimationFrame(chaosDictionary, message)
  const initialAnimationFrame = getInitialAnimationFrame(w, h, message, trueAnimationFrame, chaosDictionary)

  const inbetweenFrames = fillInFrames(frameCount, initialAnimationFrame, trueAnimationFrame)

  return [initialAnimationFrame, ...inbetweenFrames, trueAnimationFrame]
}