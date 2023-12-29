import { Point } from '@/lib/validators/Point'
import { FC } from 'react'
import { toast, useToast } from '../ui/use-toast'

interface CopyFieldProps {
  animationFrames: Point[][]
}

export const CopyField: FC<CopyFieldProps> = ({ animationFrames }) => {
  const text = JSON.stringify(animationFrames.at(-1))
  const { toast } = useToast()

  const copyText = () => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied!',
      description: 'The text has been copied to your clipboard.',
    })
  }

  return (
    <div className="relative min-w-[300px] w-full max-w-2xl h-full max-h-40 p-2 flex flex-col gap-2 border-2 rounded-lg">
      <div className="border-b py-1 flex justify-between items-center">
        <h1 className="text-xl">{`Text as Coordinates`}</h1>
        <button className="bg-foreground/20 px-4 py-1 rounded-lg backdrop-blur" onClick={copyText}>Copy</button>
      </div>
      {/* P element with scroll track hidden */}
      <p className="py-2 overflow-auto text-slate-100/80">
        {text}
      </p>
    </div>
  )
}