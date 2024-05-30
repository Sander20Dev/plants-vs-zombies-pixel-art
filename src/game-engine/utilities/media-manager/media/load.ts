import { images } from '../media-storage'
import { audios, sprites } from './all-src.json'

async function loadAllAudios() {
  let i = 0
  await Promise.all(
    audios.map((src) => {
      const audio = new Audio()

      return new Promise<void>((resolve) => {
        audio.preload = 'auto'
        audio.oncanplaythrough = () => {
          i++
          console.log(i + ' / ' + audios.length, src)
          resolve()
        }
        audio.src = src
      })
    })
  )
}

async function loadAllImages() {
  const mm = document.querySelector('#multimedia')!

  let i = 0
  await Promise.all(
    sprites.map((src) => {
      if (Object.keys(images).includes(src)) return
      const img = new Image()
      images[src] = img

      mm.appendChild(img)

      return new Promise<void>((resolve) => {
        img.onload = () => {
          i++
          console.log(i + ' / ' + sprites.length, src)

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
