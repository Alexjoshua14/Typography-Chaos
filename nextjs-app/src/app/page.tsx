import { Suspense, useMemo } from 'react'

import { ChaosWrapper } from '@/components/ChaosWrapper'
import { Sandbox } from '@/components/sandbox/Sandbox'

export default async function Home() {

  return (
    <main className="flex min-h-screen h-[400vh] flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl flex flex-col items-center gap-10 font-mono">
        <Suspense fallback={<div>Loading..</div>}>
          <ChaosWrapper text="Welcome!" />
          <Sandbox />
        </Suspense>
      </div>
    </main>
  )
}
