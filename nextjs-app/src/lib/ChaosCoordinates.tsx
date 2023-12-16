'use server'

import { ChaosServerResponse } from "./validators/Coordinate"

const PYTHON_SERVER = "http://localhost:8000/chaos-letter"

export async function getChaosCoordinates(text: string) {
  try {
    const res = await fetch(PYTHON_SERVER, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_string: text })
    })

    if (res.ok) {
      const result = await res.json()
      console.log(result)

      const points = ChaosServerResponse.parse(result)

      return points.result
    } else {
      console.log('Server responded with an error:', res.status)
    }
  } catch (err) {
    console.log(err)
  }

  return null
}

