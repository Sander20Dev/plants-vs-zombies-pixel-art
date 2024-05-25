import { images } from '../media-storage'
import { audios, sprites } from './all-src.json'

async function loadAllAudios() {
  await Promise.all(
    audios.map((src) => {
      const audio = new Audio()

      return new Promise<void>((resolve) => {
        audio.preload = 'auto'
        audio.oncanplaythrough = () => {
          resolve()
        }
        audio.src = src
      })
    })
  )
}

async function loadAllImages() {
  const mm = document.querySelector('#multimedia')!

  await Promise.all(
    sprites.map((src) => {
      if (Object.keys(images).includes(src)) return
      const img = new Image()
      images[src] = img

      mm.appendChild(img)

      return new Promise<void>((resolve) => {
        img.onload = () => {
          resolve()
        }
        img.src = src
      })
    })
  )
}

export async function loadAllMedia() {
  await Promise.all([loadAllImages(), loadAllAudios()])
}
