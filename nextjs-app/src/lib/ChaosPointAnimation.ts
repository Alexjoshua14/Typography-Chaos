import { BoundingBox } from "./validators/BoundingBox"
import { Point } from "./validators/Point"

const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const easeInOutQuad = (t: number) => {
  return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

const animateRandomToTruePosition = (initialPosition: Point, truePosition: Point, frame: number, totalFrames: number): Point => {
  const x = initialPosition[0] + easeInOutQuad(frame / totalFrames) * (truePosition[0] - initialPosition[0])
  const y = initialPosition[1] + easeInOutQuad(frame / totalFrames) * (truePosition[1] - initialPosition[1])

  return [x, y, initialPosition[2]]

}

export const randomPosition = (point: Point, bounds: BoundingBox): Point => {
  const randomX = getRandomNumber(0, bounds.width)
  const randomY = getRandomNumber(0, bounds.height)
  return [randomX, randomY, point[2]]
}

// Takes a point and a chaos value and returns a new point
export const chaosPosition = (intialPostion: Point, truePosition: Point, frame: number, totalFrames: number): Point => {
  
  return animateRandomToTruePosition(intialPostion, truePosition, frame, totalFrames)
}