import { getAlphabetCoordinates, getChaosCoordinates } from "./pythonAPI"
import { ChaosCharacter } from "./validators/ChaosCharacter"

export class ChaosDictionary {
  protected dict = new Map<String, ChaosCharacter>()
  protected font: String = "Space_Mono"

  /** TODO: Determine if promises are simultaneous or sequential */
  async fetchLetters(text: String): Promise<Map<String, ChaosCharacter | null>> {
    // let letters = new Map<String, ChaosCharacter | null>()

    for (const letter of text.split('')) {
      if (!this.dict.has(letter)) {
        // console.log(`Getting letter: ${letter}`)
        try {
          const chaosCharacter = await getChaosCoordinates(letter, this.font)
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

  async fetchAlphabet() {
    // Fetch all letters of the alphabet lowercase and uppercase along with numbers and punctuation
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?!- "
    let letters = await getAlphabetCoordinates(alphabet)
    
  }

  get(letter: String): ChaosCharacter | null {
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

  setFont(font: String) {
    // If changing fonts, all letters must be fetched again
    if (font !== this.font) {
      this.font = font
      this.clear()
    }
  }
}