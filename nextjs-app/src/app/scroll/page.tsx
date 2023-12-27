'use client'

import ChaosWrapper from "@/components/ChaosWrapper"
import { AnimationType } from "@/lib/validators/AnimationType"
import { scroll } from "framer-motion"
import { useState } from "react"


export default function Scroll() {

  let frameCount = 240
  // Keeps track of scroll progress
  const [currentFrame, setCurrentFrame] = useState(0)

  // Updates the scroll progress
  scroll((progress) => {
    setCurrentFrame(Math.floor(progress * frameCount))
  })


  return (
    <main className="h-[200vh]">
      {/* Sticky element that forms the letters based on scroll progress */}
      <div className="relative h-[200vh]" id="track">
        <div className="sticky top-1/2 -translate-y-1/2 grid place-content-center" id="main-text">
          <ChaosWrapper text="Hello World" animationType={AnimationType.Manual} currentFrame={currentFrame} repeatDelay={0} />
        </div>
      </div>
    </main>
  )
}