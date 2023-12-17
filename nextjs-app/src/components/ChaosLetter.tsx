'use client'

import { FC, useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { Point } from '@/lib/validators/Point'

interface ChaosLetterProps {
  letter: string,
  points: Point[] | null
}

const scale = 3
const randomness = 7

const Point = (coordinates: Point) => (
  <div className={`absolute w-1 h-1 rounded-full bg-teal-600`} style={{ left: `${coordinates[0] * scale}px`, top: `${coordinates[1] * scale}px` }} />
)

/**
 * TODO: Add some jitter via keyframes
 * @param coordinates 
 * @returns 
 */
const MotionPoint = (coordinates: Point, randomXJitter?: number, randomYJitter?: number) => {
  console.log(randomXJitter)
  const actualX = coordinates[0] * scale;
  const actualY = coordinates[1] * scale;

  const [initialX, setInitialX] = useState(actualX * (randomXJitter ?? 1));
  const [initialY, setInitialY] = useState(actualY * (randomYJitter ?? 1));

  // useEffect(() => {
  //   // Set the initial X value on the initial render
  //   // setTimeout(() => {
  //   //   setInitialX(actualX);
  //   // }, 1000);

  // }, [actualX]);

  // const actualX = coordinates[0] * scale
  // const initialX = actualX * ((Math.random() / 2) - .125)


  return (
    <motion.div className={`absolute w-1 h-1 rounded-full bg-fuchsia-600`}
      animate={{ x: [initialX, actualX, initialX], y: [initialY, actualY, initialY] }}
      transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
    />
  )
}

const ChaosLetter: FC<ChaosLetterProps> = ({ letter, points }) => {
  // const points = letterDictionary.get('A')
  if (points === null) {
    console.error("Points is null..")
  } else {
    console.log("Points to be used: ", points)
  }

  return (
    <motion.div className="relative h-28 w-28 border-2 border-yellow-700" aria-description={`Letter ${letter} in pixelated form`}>
      {points?.map((coord) => {
        return MotionPoint(coord, (1 + (-0.5 + Math.random()) / randomness), (1 + (-0.5 + Math.random()) / randomness))
      })}
    </motion.div>
  )
}

export default ChaosLetter