
export const delayRepeat = (func: () => void, delay: number) => {
  if (delay > 0) {
    setTimeout(() => {
      func()
    }, delay)
  } else {
    func()
  }
}