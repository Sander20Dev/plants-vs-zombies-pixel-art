import { audios } from '../utilities/media-manager/media-storage'
import NodeAbs from './node'

export default class AudioPlayer extends NodeAbs {
  audio: HTMLAudioElement
  constructor(src: string, { pauseSound = false, loop = false } = {}) {
    super()
    this.audio = new Audio(src)

    if (!pauseSound) {
      audios.push(this.audio)
    }
    this.audio.loop = loop
  }

  async play() {
    await this.audio.play()
  }

  destroy(): void {
    const i = audios.indexOf(this.audio)

    if (i > -1) {
      audios.splice(i, 1)
    }

    this.audio.pause()

    super.destroy()
  }
}

export class MultipleAudioPlayer extends NodeAbs {
  #audios: HTMLAudioElement[] = []

  #genAudio() {
    const audio = new Audio(this.src)
    audio.loop = false

    audios.push(audio)

    audio.onended = () => {
      const i = audios.indexOf(audio)

      if (i > -1) {
        audios.splice(i, 1)
      }

      const i2 = this.#audios.indexOf(audio)

      if (i2 > -1) {
        this.#audios.splice(i2, 1)
      }

      audio.remove()
    }

    return audio
  }

  constructor(public src: string) {
    super()
  }

  async play() {
    await this.#genAudio().play()
  }

  destroy(): void {
    for (const audio of this.#audios) {
      const i = audios.indexOf(audio)

      if (i > -1) {
        audios.splice(i, 1)
      }

      audio.pause()

      super.destroy()
    }
  }
}
