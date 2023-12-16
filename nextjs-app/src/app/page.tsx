import Image from 'next/image'
import ChaosLetter from '@/components/ChaosLetter'
import { getChaosCoordinates } from '@/lib/ChaosCoordinates'
import ChaosString from '@/components/ChaosString'

export default async function Home() {
  const points = await getChaosCoordinates('A')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <ChaosString text="Hello" />
        <ChaosString text="World!" />
      </div>
    </main>
  )
}
