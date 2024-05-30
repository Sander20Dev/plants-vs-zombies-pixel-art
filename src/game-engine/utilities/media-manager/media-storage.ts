export function getImage(src: string) {
  if (images[src] == null) {
    images[src] = new Image()
    images[src].src = src
  }

  return images[src]
}

export function onPauseAudios() {
  for (let i = 0; i < audios.length; i++) {
    const html = audios[i]

    if (!html.paused) {
      audiosPlayed.push(i)
      html.pause()
    }
  }
}

export function clearAudios() {
  for (const audio of audios) {
    audio.pause()
  }
  audios.splice(0, audios.length)
  audiosPlayed = []
}

export function onPlayAudios() {
  for (const i of audiosPlayed) {
    audios[i].play()
  }
  audiosPlayed = []
}

export let audiosPlayed: number[] = []

export const images: Record<string, HTMLImageElement> = {}
export const audios: HTMLAudioElement[] = []
