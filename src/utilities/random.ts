/** Includes min but no max */
export function getRandomValue(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function getRandomElementFrom<T>(
  array: { element: T; porcent: number }[]
) {
  let maxPorcent = array.reduce((a, b) => a + b.porcent, 0)

  for (let i = 0; i < array.length; i++) {
    const { element, porcent } = array[i]

    if (getRandomValue(maxPorcent, 1) <= porcent) {
      return element
    }

    maxPorcent -= porcent
  }

  return null
}

export function getRandomArrayFrom<T>(
  array: { element: T; porcent: number }[],
  length: number
) {
  return Array(length)
    .fill(0)
    .map(() => getRandomElementFrom(array)!)
}
