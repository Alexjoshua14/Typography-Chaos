import { getAlphabetCoordinates, getChaosCoordinates } from "./pythonAPI"
import { ChaosCharacter } from "./validators/ChaosCharacter"

export class ChaosDictionary {
  protected dict = new Map<String, ChaosCharacter>()
  protected font: String = "Space_Mono"

  /** TODO: Determine if promises are simultaneous or sequential 
   * Fetches the coordinates for each letter in the given text
   * Currently, this is done sequentially, but it could be done in parallel
   * 
   * @param text - The text to be displayed
   * 
  */
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

  /**
   * Fetches the coordinates for each letter in the alphabet
   * 
   */
  async fetchAlphabet() {
    // Fetch all letters of the alphabet lowercase and uppercase along with numbers and punctuation
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?!- "
    let letters = await getAlphabetCoordinates(alphabet)
    
  }

  /**
   * @param letter - The letter to be fetched
   * @returns The coordinates for the given letter
   */
  get(letter: String): ChaosCharacter | null {
    return this.dict.get(letter) ?? null
  }

  /**
   * @returns The number of letters in the dictionary
   */
  size(): number {
    return this.dict.size
  }

  /**
   * Clears the dictionary
   */
  clear(): void {
    this.dict.clear()
  }

  /**
   * @param letter - The letter to be checked
   * @returns True if the dictionary contains the given letter
   */
  has(letter: String): boolean {
    return this.dict.has(letter)
  }

  /**
   * @returns A string representation of the dictionary
   */
  toString(): String {
    return JSON.stringify(this.dict)
  }

  /**
   * Sets the font of the dictionary
   * @param font - The font to be set
   * @returns The font of the dictionary
   */
  setFont(font: String) {
    // If changing fonts, all letters must be fetched again
    if (font !== this.font) {
      this.font = font
      this.clear()
    }
  }
}