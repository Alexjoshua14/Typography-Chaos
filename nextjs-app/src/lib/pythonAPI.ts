'use server'

import { ChaosServerAvailableFontsResponse, ChaosServerResponse } from "./validators/ChaosServer"

const API_URL = "http://localhost:8000"
const AVAILABLE_FONTS_URL = `${API_URL}/availableFonts`
const CHAOS_LETTERS_URL = `${API_URL}/chaosLetter`

export async function getAvailableFonts() {
  const response = await fetch(AVAILABLE_FONTS_URL)
  
  const data = await response.json()
  
  const parsed = ChaosServerAvailableFontsResponse.parse(data)
  return parsed.result
}

export async function getChaosCoordinates(text: String, font?: String) {
  let payload: {input_string: String, font?: String} = { input_string: text }
  if (font) {
    payload["font"] = font
  }

  try {
    const res = await fetch(CHAOS_LETTERS_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-cache',
    })

    if (res.ok) {
      const result = await res.json()
      // console.log("Result: " + JSON.stringify(result))
      // console.log(JSON.stringify(result))
      // console.log("Parsing result")
      const points = ChaosServerResponse.parse(result)
      // console.log("Points: " + points)

      return points.result
    } else {
      // console.log('Server responded with an error:', res.status)
    }
  } catch (err) {
    // console.log("WHooops")
    console.log(err)
  }

  return null
}

export async function getAlphabetCoordinates(font?: String, fontSize?: number) {
  let payload: {input_string: String, font?: String, fontSize?: String} = { input_string: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?!- " }

  if (font) {
    payload["font"] = font
  }
  if (fontSize) {
    payload["fontSize"] = fontSize.toString()
  }

  const response = await fetch(CHAOS_LETTERS_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  })

  const data = await response.json()
  console.log(JSON.stringify(data))
  // const parsed = ChaosServerResponse.parse(data)
  
  
}