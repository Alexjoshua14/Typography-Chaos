import { getChaosCoordinates } from '@/lib/ChaosCoordinates'
import { FC } from 'react'
import ChaosLetter from './ChaosLetter'
import { Coordinate } from '@/lib/validators/Coordinate'

interface ChaosStringProps {
  text: string
}

/** TODO: Determine if promises are simultaneous or sequential */
async function fetchLetters(text: String): Promise<Map<String, Coordinate[] | null>> {
  let letters = new Map<String, Coordinate[] | null>()

  for (const letter of text.split('')) {
    if (!letters.has(letter)) {
      console.log(`Getting letter: ${letter}`)
      const coords = await getChaosCoordinates(letter)
      letters.set(letter, coords)
    }
  }

  return letters
}


/**
 * Converts a text into a string of chaos letters
 * 
 * @param param0 
 * @returns 
 */
const ChaosString: FC<ChaosStringProps> = async ({ text }) => {
  const letters = await fetchLetters(text)


  return (
    <div className="flex w-fit">
      {text.split('').map((letter, index) => (
        <ChaosLetter key={`${text}-${letter}-${index}`} letter={letter} points={letters.get(letter) ?? null} />
      ))}
    </div>
  )
}

export default ChaosString