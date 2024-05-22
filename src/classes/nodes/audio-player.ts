import { multiplyVelocity } from '../../dev/constants'
import { audios } from '../../utilities/media-storage'
import NodeAbs from './node'

export default class AudioPlayer extends NodeAbs {
  audio: HTMLAudioElement
  constructor(src: string, { pauseSound = false, loop = false } = {}) {
    super()
    this.audio = new Audio(src)
    this.audio.playbackRate = multiplyVelocity

    if (!pauseSound) {
      audios.push(this.audio)
    }
    this.audio.loop = loop
  }

  play() {
    this.audio.play()
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
