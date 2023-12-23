import { FC } from 'react'

interface PlaybackControlsProps {
  prevFrame: () => void
  nextFrame: () => void
  start: () => void
  stop: () => void
  seek: (frame: number) => void
  currentFrame: number
  frameCount: number
}

export const PlaybackControls: FC<PlaybackControlsProps> = ({ prevFrame, nextFrame, start, stop, seek, currentFrame, frameCount }) => {
  return (
    <div aria-description='Animation Control Panel'>
      <div className="flex gap-6 items-center justify-center h-14">
        <button onClick={prevFrame}>
          {`<`}
        </button>
        <div className="flex gap-2 items-center justify-center">
          <button onClick={start}>
            {`▶`}
          </button>
          <button onClick={stop}>
            {`◼`}
          </button>
        </div>
        <button onClick={nextFrame}>
          {`>`}
        </button>
      </div>
      <input type="range" value={currentFrame} min={0} max={frameCount} step={1} onChange={(e) => seek(parseInt(e.target.value))} />
    </div>
  )
}