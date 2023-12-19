'use server'
import { ChaosServerAvailableFontsResponse } from "./validators/ChaosServer"

const API_URL = "http://localhost:8000"
const AVAILABLE_FONTS_URL = `${API_URL}/availableFonts`

export async function getAvailableFonts() {
  const response = await fetch(AVAILABLE_FONTS_URL)
  console.log(response)
  const data = await response.json()
  console.log(data)
  const parsed = ChaosServerAvailableFontsResponse.parse(data)
  return parsed.result
}