import Image from 'next/image'
import ChaosLetter from '@/components/ChaosLetter'
import { getChaosCoordinates } from '@/lib/ChaosCoordinates'
import ChaosString from '@/components/ChaosString'
import ChaosWrapper from '@/components/ChaosWrapper'

export default async function Home() {
  const points = await getChaosCoordinates('A')

  return (
    <main className="flex min-h-screen h-[400vh] flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="fixed">
          <ChaosWrapper text="Hello" />
          <ChaosWrapper text="World!" />
        </div>
      </div>
    </main>
  )
}
