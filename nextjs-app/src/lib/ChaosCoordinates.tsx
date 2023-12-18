'use server'

import { ChaosServerResponse } from "./validators/ChaosServer"

const PYTHON_SERVER = "http://localhost:8000/chaos-letter"

export async function getChaosCoordinates(text: string) {
  try {
    const res = await fetch(PYTHON_SERVER, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_string: text }),
      cache: 'no-cache',
    })

    if (res.ok) {
      const result = await res.json()
      console.log("Result: " + JSON.stringify(result))

      console.log("Parsing result")
      const points = ChaosServerResponse.parse(result)
      console.log("Points: " + points)

      return points.result
    } else {
      console.log('Server responded with an error:', res.status)
    }
  } catch (err) {
    // console.log("WHooops")
    console.log(err)
  }

  return null
}

