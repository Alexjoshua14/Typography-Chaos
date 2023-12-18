'use client'

import { getChaosCoordinates } from '@/lib/ChaosCoordinates'
import { FC, useEffect, useRef, useState } from 'react'
import ChaosLetter from './ChaosLetter'
import { Point } from '@/lib/validators/Point'
import { ChaosCharacter } from '@/lib/validators/ChaosCharacter'
import { ChaosDictionary } from '@/lib/ChaosDictionary'

interface ChaosStringProps {
  text: string
  chaosDictionary: Map<String, ChaosCharacter | null>
}

/**
 * Converts a text into a string of chaos letters
 * 
 * @param param0 
 * @returns 
 */
const ChaosString: FC<ChaosStringProps> = ({ text, chaosDictionary }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    // Get width and height of string
    let w = 0
    let h = 0
    text.split('').forEach((letter, index) => {
      w += chaosDictionary.get(letter)?.bounding_box.width ?? 0
      h = Math.max(h, chaosDictionary.get(letter)?.bounding_box.height ?? 0)
    })

    setWidth(w)
    setHeight(h)

  }, [setWidth, setHeight, text, chaosDictionary])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (canvas && ctx) {
      console.log("Drawing points")
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#a864fd'

      // Keeps track of where the next letter should be begin
      let leftOffset = 0

      // For each letter in the text
      // Get the points and bounding box from the chaos dictionary
      // Then plot the points on the canvas
      text.split('').forEach((letter, index) => {
        const { points, bounding_box } =
          chaosDictionary.get(letter) ??
          { points: null, bounding_box: { width: 0, height: 0 } }
        console.log("Height: " + bounding_box.height)

        if (points) {
          // console.log("Drawing points for letter: " + letter)
          points.forEach((point) => {
            // Offset point by preceding letters' bounding box
            const x = point[0] + leftOffset

            // Plot point
            ctx.beginPath()
            ctx.arc(x, point[1], 1, 0, 2 * Math.PI)
            ctx.fill()
          })

          // Move left offset by the width of the letter like a typewriter
          leftOffset += bounding_box.width
        }
      })
    }
  }, [text, chaosDictionary])

  return (
    <div className="flex w-fit border-2 border-pink-800">
      <canvas ref={canvasRef} width={width} height={height} className='border-2 border-pink-500' />
    </div>
  )
}
// const ChaosString: FC<ChaosStringProps> = async ({ text, chaosDictionary }) => {

//   return (
//     <div className="flex w-fit">
//       {text.split('').map((letter, index) => {
//         const { points, bounding_box } =
//           chaosDictionary.get(letter) ??
//           { points: null, bounding_box: { width: 0, height: 0 } }

//         return (
//           <ChaosLetter
//             key={`${text}-${letter}-${index}`}
//             letter={letter}
//             points={points}
//             bounding_box={bounding_box}
//           />
//         )
//       })}
//     </div>
//   )
// }

export default ChaosString