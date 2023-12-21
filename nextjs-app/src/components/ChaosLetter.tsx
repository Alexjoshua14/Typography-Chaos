import { FC } from 'react'

import { Point } from '@/lib/validators/Point'
import { BoundingBox } from '@/lib/validators/BoundingBox'


interface ChaosLetterProps {
  letter: string,
  points: Point[] | null
  bounding_box?: BoundingBox
}

/**
 * 
 * @param coordinates tuple of x, y, and z coordinates
 * @param scale 
 */
const Point = (coordinates: Point, scale: number) => (
  <div className={`absolute w-[1px] h-[1px] rounded-full bg-teal-600`} style={{ left: `${coordinates[0] * scale}px`, top: `${coordinates[1] * scale}px` }} />
)

let stamp = 0

/**
 * A single letter in pixelated form
 * 
 * @param param0 
 * @returns 
 */
const ChaosLetter: FC<ChaosLetterProps> = ({ letter, points, bounding_box }) => {
  const visa = stamp++

  return (
    <div
      className="relative"
      style={{ width: bounding_box?.width, height: bounding_box?.height }}
      aria-description={`Letter ${letter} in pixelated form`}
    >
      {points?.map((coord) => {
        return (
          <span key={`${letter}-${visa}`}>
            {Point(coord, 1)}
          </span>
        )
      })}
    </div>
  )
}

export default ChaosLetter