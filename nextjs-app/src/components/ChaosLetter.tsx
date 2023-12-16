'use client'

import { FC } from 'react'

import { motion } from 'framer-motion'

import { Coordinate } from '@/lib/validators/Coordinate'

interface ChaosLetterProps {
  letter: string,
  points: Coordinate[] | null
}

const scale = 3

const Point = (coordinates: Coordinate) => (
  <div className={`absolute w-1 h-1 rounded-full bg-teal-600`} style={{ left: `${coordinates[0] * scale}px`, top: `${coordinates[1] * scale}px` }} />
)

const MotionPoint = (coordinates: Coordinate) => (
  <motion.div className={`absolute w-1 h-1 rounded-full bg-fuchsia-600`}
    initial={{ x: `${coordinates[0] * scale * ((Math.random() / 2) - .125)}px`, y: `${coordinates[1] * scale}px` }}
    animate={{ x: `${coordinates[0] * scale}px`, y: `${coordinates[1] * scale}px` }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
)

const ChaosLetter: FC<ChaosLetterProps> = ({ letter, points }) => {
  // const points = letterDictionary.get('A')
  if (points === null) {
    console.error("Points is null..")
  } else {
    console.log("Points to be used: ", points)
  }

  return (
    <div className="relative h-28 w-28 border-2 border-yellow-700" aria-description={`Letter ${letter} in pixelated form`}>
      {points?.map((coord) => MotionPoint(coord))}
    </div>
  )
}

export default ChaosLetter