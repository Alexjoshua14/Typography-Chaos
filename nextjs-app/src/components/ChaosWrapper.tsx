
import 'server-only'
import { FC } from 'react'

import ChaosString from './ChaosString'
import { ChaosDictionary } from '@/lib/ChaosDictionary'

interface ChaosWrapperProps {
  text: string
}

const ChaosWrapper: FC<ChaosWrapperProps> = async ({ text }) => {
  let chaosDictionary = new ChaosDictionary()
  await chaosDictionary.fetchLetters(text)
  console.log(chaosDictionary)

  return (
    <ChaosString text={text} chaosDictionary={chaosDictionary} />
  )
}

export default ChaosWrapper