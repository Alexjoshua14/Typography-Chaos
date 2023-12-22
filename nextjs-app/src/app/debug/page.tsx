import { FC } from 'react'
import { DebugPanel } from '@/components/debug/debugPanel'

interface DebugProps {

}

const Debug: FC<DebugProps> = ({ }) => {
  return (
    <main className="w-full h-full max-w-5xl p-24 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl">
        Debug Home
      </h1>
      <DebugPanel />
    </main>
  )
}

export default Debug