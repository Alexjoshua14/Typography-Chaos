import { getChaosCoordinates } from '@/lib/ChaosCoordinates'
import { FC } from 'react'
import ChaosLetter from './ChaosLetter'
import { Point } from '@/lib/validators/Point'

interface ChaosStringProps {
  text: string
}

/** TODO: Determine if promises are simultaneous or sequential */
async function fetchLetters(text: String): Promise<Map<String, Point[] | null>> {
  let letters = new Map<String, Point[] | null>()

  for (const letter of text.split('')) {
    if (!letters.has(letter)) {
      console.log(`Getting letter: ${letter}`)
      const res = await getChaosCoordinates(letter)
      console.log("Response: " + res)
      const coords = res?.points ?? null
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