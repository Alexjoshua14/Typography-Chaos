'use client'

import { FC, useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { Point } from '@/lib/validators/Point'
import { BoundingBox } from '@/lib/validators/BoundingBox'

import { useScroll } from 'framer-motion'

interface ChaosLetterProps {
  letter: string,
  points: Point[] | null
  bounding_box?: BoundingBox
}

const scale = 1
const randomness = 7

const Point = (coordinates: Point) => (
  <div className={`absolute w-1 h-1 rounded-full bg-teal-600`} style={{ left: `${coordinates[0] * scale}px`, top: `${coordinates[1] * scale}px` }} />
)
let stamp = 0

/**
 * TODO: Add some jitter via keyframes
 * @param coordinates 
 * @returns 
 */
const MotionPoint = (coordinates: Point, randomXJitter?: number, randomYJitter?: number) => {
  // captures value of stamp at time of function call and increments stamp
  // to uniquely identify each point
  const visa = stamp++

  const x = coordinates[0]
  const y = coordinates[1]

  if (visa === 0) {
    console.log("Visa:" + visa + " - " + x)

  }

  // useEffect(() => {
  //   // Set the initial X value on the initial render
  //   // setTimeout(() => {
  //   //   setInitialX(actualX);
  //   // }, 1000);

  // }, [actualX]);

  // const actualX = coordinates[0] * scale
  // const initialX = actualX * ((Math.random() / 2) - .125)


  return (
    <motion.div className={`absolute w-1 h-1 bg-fuchsia-600`}
      initial={{ x: x, y: y }}
      // animate={{ x: x, y: y }}
      transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }}
    />
  )
}

const ChaosLetter: FC<ChaosLetterProps> = ({ letter, points, bounding_box }) => {
  return (
    <motion.div
      className="relative border-2 border-yellow-700"
      style={{ width: bounding_box?.width, height: bounding_box?.height }}
      aria-description={`Letter ${letter} in pixelated form`}
    >
      {points?.map((coord) => {
        return (
          <span key={`${letter}-${stamp++}`}>
            {MotionPoint(coord, (10 * Math.random() / randomness), (10 * Math.random() / randomness))}
          </span>
        )
      })}
    </motion.div>
  )
}

export default ChaosLetter