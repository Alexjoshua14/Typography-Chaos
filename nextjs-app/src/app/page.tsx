import { Suspense, useMemo } from 'react'

import ChaosWrapper from '@/components/ChaosWrapper'

export default async function Home() {

  return (
    <main className="flex min-h-screen h-[400vh] flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-center justify-between font-mono">
        <Suspense fallback={<div>Loading..</div>}>
          <div>
            {useMemo(() => <ChaosWrapper text="Hello" />, [])}
            {useMemo(() => <ChaosWrapper text="World!" />, [])}
          </div>
        </Suspense>
      </div>
    </main>
  )
}
