import { Point } from '@/lib/validators/Point'
import { FC } from 'react'

interface CopyFieldProps {
  animationFrames: Point[][]
}

export const CopyField: FC<CopyFieldProps> = ({ animationFrames }) => {
  const text = JSON.stringify(animationFrames.at(-1))

  const copyText = () => {
    navigator.clipboard.writeText(text)

  }

  return (
    <div className="relative min-w-[300px] w-full h-full max-h-40 p-2 flex flex-col gap-2 border-2 rounded-lg">
      <div className="border-b py-1 flex justify-between items-center">
        <h1 className="text-xl">{`Text as Coordinates`}</h1>
        <button className="bg-foreground/20 px-4 py-1 rounded-lg backdrop-blur" onClick={() => navigator.clipboard.writeText(text)}>Copy</button>
      </div>
      {/* P element with scroll track hidden */}
      <p className="py-2 overflow-auto text-slate-100/80">
        {text}
      </p>
    </div>
  )
}