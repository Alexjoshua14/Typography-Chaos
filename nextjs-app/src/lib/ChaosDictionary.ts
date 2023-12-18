import { getChaosCoordinates } from "./ChaosCoordinates"
import { ChaosCharacter } from "./validators/ChaosCharacter"

export class ChaosDictionary {
  dict = new Map<String, ChaosCharacter>()

  /** TODO: Determine if promises are simultaneous or sequential */
  async fetchLetters(text: String): Promise<Map<String, ChaosCharacter | null>> {
    // let letters = new Map<String, ChaosCharacter | null>()

    for (const letter of text.split('')) {
      if (!this.dict.has(letter)) {
        // console.log(`Getting letter: ${letter}`)
        try {
          const chaosCharacter = await getChaosCoordinates(letter)
          // console.log("Here: " + JSON.stringify(chaosCharacter))
          if (chaosCharacter === null) {
            console.error("Chaos character is null")
          } else
            this.dict.set(letter, chaosCharacter)
        } catch (err) {
          console.error(err)
        }
      } 
    }

    return this.dict
  }

  get(letter: String): ChaosCharacter | null {
    console.log("Getting letter: " + letter)
    console.log("Dict: " + JSON.stringify(this.dict.get(letter)))
    return this.dict.get(letter) ?? null
  }

  size(): number {
    return this.dict.size
  }

  clear(): void {
    this.dict.clear()
  }

  has(letter: String): boolean {
    return this.dict.has(letter)
  }

  toString(): String {
    return JSON.stringify(this.dict)
  }
}