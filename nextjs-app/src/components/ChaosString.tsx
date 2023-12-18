import { getChaosCoordinates } from '@/lib/ChaosCoordinates'
import { FC } from 'react'
import ChaosLetter from './ChaosLetter'
import { Point } from '@/lib/validators/Point'
import { ChaosCharacter } from '@/lib/validators/ChaosCharacter'
import { ChaosDictionary } from '@/lib/ChaosDictionary'

interface ChaosStringProps {
  text: string
  chaosDictionary: ChaosDictionary
}

/**
 * Converts a text into a string of chaos letters
 * 
 * @param param0 
 * @returns 
 */
const ChaosString: FC<ChaosStringProps> = async ({ text, chaosDictionary }) => {

  return (
    <div className="flex w-fit">
      {text.split('').map((letter, index) => {
        const { points, bounding_box } =
          chaosDictionary.get(letter) ??
          { points: null, bounding_box: { width: 0, height: 0 } }

        return (
          <ChaosLetter
            key={`${text}-${letter}-${index}`}
            letter={letter}
            points={points}
            bounding_box={bounding_box}
          />
        )
      })}
    </div>
  )
}

export default ChaosString