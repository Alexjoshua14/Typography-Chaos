import { FC } from 'react'
import { ModeToggle } from './theme/ModeToggle'

interface navBarProps {

}

const navOptions = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Available Fonts",
    href: "/fonts",
  }
]

export const NavBar: FC<navBarProps> = ({ }) => {
  return (
    <div className="z-40 fixed top-0 left-0 w-full h-14 flex items-center px-10 py-2 bg-secondary">
      <ModeToggle />
    </div>
  )
}