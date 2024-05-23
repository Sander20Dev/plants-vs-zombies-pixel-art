export function getImage(src: string, width?: number, height?: number) {
  if (images[src] == null) {
    images[src] = new Image(width, height)
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

function loadAllImages() {
  const allSrc = [
    '/sprites/plants/cherry-bomb/boomb-1.png',
    '/sprites/plants/cherry-bomb/boomb-10.png',
    '/sprites/plants/cherry-bomb/boomb-2.png',
    '/sprites/plants/cherry-bomb/boomb-3.png',
    '/sprites/plants/cherry-bomb/boomb-4.png',
    '/sprites/plants/cherry-bomb/boomb-5.png',
    '/sprites/plants/cherry-bomb/boomb-6.png',
    '/sprites/plants/cherry-bomb/boomb-7.png',
    '/sprites/plants/cherry-bomb/boomb-8.png',
    '/sprites/plants/cherry-bomb/boomb-9.png',
    '/sprites/plants/cherry-bomb/explotion-1.png',
    '/sprites/plants/cherry-bomb/explotion-2.png',
    '/sprites/plants/cherry-bomb/explotion-3.png',
    '/sprites/plants/cherry-bomb/explotion-4.png',
    '/sprites/plants/cherry-bomb/explotion-5.png',
    '/sprites/plants/cherry-bomb/explotion-6.png',
    '/sprites/plants/chomper/idle-1.png',
    '/sprites/plants/chomper/idle-2.png',
    '/sprites/plants/chomper/idle-3.png',
    '/sprites/plants/chomper/idle-eat-1.png',
    '/sprites/plants/chomper/idle-eat-2.png',
    '/sprites/plants/chomper/idle-eat-3.png',
    '/sprites/plants/chomper/init-eat-1.png',
    '/sprites/plants/chomper/init-eat-10.png',
    '/sprites/plants/chomper/init-eat-11.png',
    '/sprites/plants/chomper/init-eat-2.png',
    '/sprites/plants/chomper/init-eat-3.png',
    '/sprites/plants/chomper/init-eat-4.png',
    '/sprites/plants/chomper/init-eat-5.png',
    '/sprites/plants/chomper/init-eat-6.png',
    '/sprites/plants/chomper/init-eat-7.png',
    '/sprites/plants/chomper/init-eat-8.png',
    '/sprites/plants/chomper/init-eat-9.png',
    '/sprites/plants/chomper/prepare-to-eat-1.png',
    '/sprites/plants/chomper/prepare-to-eat-10.png',
    '/sprites/plants/chomper/prepare-to-eat-11.png',
    '/sprites/plants/chomper/prepare-to-eat-2.png',
    '/sprites/plants/chomper/prepare-to-eat-3.png',
    '/sprites/plants/chomper/prepare-to-eat-4.png',
    '/sprites/plants/chomper/prepare-to-eat-5.png',
    '/sprites/plants/chomper/prepare-to-eat-6.png',
    '/sprites/plants/chomper/prepare-to-eat-7.png',
    '/sprites/plants/chomper/prepare-to-eat-8.png',
    '/sprites/plants/chomper/prepare-to-eat-9.png',
    '/sprites/plants/chomper/recharge-1.png',
    '/sprites/plants/chomper/recharge-2.png',
    '/sprites/plants/chomper/recharge-3.png',
    '/sprites/plants/chomper/recharge-4.png',
    '/sprites/plants/chomper/recharge-5.png',
    '/sprites/plants/chomper/recharge-6.png',
    '/sprites/plants/chomper/recharge-7.png',
    '/sprites/plants/chomper/recharge-8.png',
    '/sprites/plants/peashooter/attack.png',
    '/sprites/plants/peashooter/idle1.png',
    '/sprites/plants/peashooter/idle2.png',
    '/sprites/plants/peashooter/idle3.png',
    '/sprites/plants/potato-mine/activate-1.png',
    '/sprites/plants/potato-mine/activate-2.png',
    '/sprites/plants/potato-mine/desactivate-1.png',
    '/sprites/plants/potato-mine/desactivate-2.png',
    '/sprites/plants/potato-mine/leave-1.png',
    '/sprites/plants/potato-mine/leave-2.png',
    '/sprites/plants/potato-mine/leave-3.png',
    '/sprites/plants/potato-mine/leave-4.png',
    '/sprites/plants/potato-mine/leave-5.png',
    '/sprites/plants/potato-mine/semiactivate-2.png',
    '/sprites/plants/potato-mine/spudow-1.png',
    '/sprites/plants/potato-mine/spudow-10.png',
    '/sprites/plants/potato-mine/spudow-2.png',
    '/sprites/plants/potato-mine/spudow-3.png',
    '/sprites/plants/potato-mine/spudow-4.png',
    '/sprites/plants/potato-mine/spudow-5.png',
    '/sprites/plants/potato-mine/spudow-6.png',
    '/sprites/plants/potato-mine/spudow-7.png',
    '/sprites/plants/potato-mine/spudow-8.png',
    '/sprites/plants/potato-mine/spudow-9.png',
    '/sprites/plants/repeater/attack.png',
    '/sprites/plants/repeater/idle1.png',
    '/sprites/plants/repeater/idle2.png',
    '/sprites/plants/repeater/idle3.png',
    '/sprites/plants/snow-pea/attack.png',
    '/sprites/plants/snow-pea/idle1.png',
    '/sprites/plants/snow-pea/idle2.png',
    '/sprites/plants/snow-pea/idle3.png',
    '/sprites/plants/sunflower/idle1.png',
    '/sprites/plants/sunflower/idle2.png',
    '/sprites/plants/sunflower/idle3.png',
    '/sprites/plants/wall-nut/1-idle1.png',
    '/sprites/plants/wall-nut/1-idle2.png',
    '/sprites/plants/wall-nut/2-idle1.png',
    '/sprites/plants/wall-nut/2-idle2.png',
    '/sprites/plants/wall-nut/3-idle1.png',
    '/sprites/plants/wall-nut/3-idle2.png',
    '/sprites/projectiles/pea.png',
    '/sprites/projectiles/snow-pea.png',
    '/sprites/ui/buttons/pause/active.png',
    '/sprites/ui/buttons/pause/normal.png',
    '/sprites/ui/characters.png',
    '/sprites/ui/lawn-mower.png',
    '/sprites/ui/lobby/bg.png',
    '/sprites/ui/lobby/buttons/adventure/active.png',
    '/sprites/ui/lobby/buttons/adventure/normal.png',
    '/sprites/ui/lobby/lobby-menu.png',
    '/sprites/ui/maps/day/bg-0.png',
    '/sprites/ui/maps/day/bg-1.png',
    '/sprites/ui/maps/day/bg-3.png',
    '/sprites/ui/maps/day/bg-mini.png',
    '/sprites/ui/maps/day/bg.png',
    '/sprites/ui/seeds/cherry-bomb.png',
    '/sprites/ui/seeds/chomper.png',
    '/sprites/ui/seeds/peashooter.png',
    '/sprites/ui/seeds/potato-mine.png',
    '/sprites/ui/seeds/repeater.png',
    '/sprites/ui/seeds/snow-pea.png',
    '/sprites/ui/seeds/sunflower.png',
    '/sprites/ui/seeds/wall-nut.png',
    '/sprites/ui/sun-counter.png',
    '/sprites/ui/sun.png',
    '/sprites/ui/views/new-game/select-difficulty/easy-button.png',
    '/sprites/ui/views/new-game/select-difficulty/hard-button.png',
    '/sprites/ui/views/new-game/select-difficulty/normal-button.png',
    '/sprites/ui/views/new-game/select-difficulty/select-difficulty.png',
    '/sprites/ui/views/new-game/select-plants/select-plants.png',
    '/sprites/ui/views/new-game/select-plants/start-button.png',
    '/sprites/ui/views/new-plant.png',
    '/sprites/ui/views/pause-menu/menu.png',
    '/sprites/ui/views/select-maps/select-maps.png',
    '/sprites/zombies/arm/normal-arm-falling-1.png',
    '/sprites/zombies/arm/normal-arm-falling-10.png',
    '/sprites/zombies/arm/normal-arm-falling-2.png',
    '/sprites/zombies/arm/normal-arm-falling-3.png',
    '/sprites/zombies/arm/normal-arm-falling-4.png',
    '/sprites/zombies/arm/normal-arm-falling-5.png',
    '/sprites/zombies/arm/normal-arm-falling-6.png',
    '/sprites/zombies/arm/normal-arm-falling-7.png',
    '/sprites/zombies/arm/normal-arm-falling-8.png',
    '/sprites/zombies/arm/normal-arm-falling-9.png',
    '/sprites/zombies/buckethead-zombie/walking-1.png',
    '/sprites/zombies/buckethead-zombie/walking-2.png',
    '/sprites/zombies/buckethead-zombie/walking-3.png',
    '/sprites/zombies/buckethead-zombie/walking-middle-1.png',
    '/sprites/zombies/buckethead-zombie/walking-middle-2.png',
    '/sprites/zombies/buckethead-zombie/walking-middle-3.png',
    '/sprites/zombies/conehead-zombie/walking-1.png',
    '/sprites/zombies/conehead-zombie/walking-2.png',
    '/sprites/zombies/conehead-zombie/walking-3.png',
    '/sprites/zombies/conehead-zombie/walking-middle-1.png',
    '/sprites/zombies/conehead-zombie/walking-middle-2.png',
    '/sprites/zombies/conehead-zombie/walking-middle-3.png',
    '/sprites/zombies/pole-vaulting-zombie/eat-1.png',
    '/sprites/zombies/pole-vaulting-zombie/eat-2.png',
    '/sprites/zombies/pole-vaulting-zombie/eat-3.png',
    '/sprites/zombies/pole-vaulting-zombie/fall-1.png',
    '/sprites/zombies/pole-vaulting-zombie/fall-2.png',
    '/sprites/zombies/pole-vaulting-zombie/fall-3.png',
    '/sprites/zombies/pole-vaulting-zombie/fall-4.png',
    '/sprites/zombies/pole-vaulting-zombie/fall-5.png',
    '/sprites/zombies/pole-vaulting-zombie/fall-6.png',
    '/sprites/zombies/pole-vaulting-zombie/jumping-1.png',
    '/sprites/zombies/pole-vaulting-zombie/jumping-2.png',
    '/sprites/zombies/pole-vaulting-zombie/jumping-3.png',
    '/sprites/zombies/pole-vaulting-zombie/jumping-4.png',
    '/sprites/zombies/pole-vaulting-zombie/jumping-5.png',
    '/sprites/zombies/pole-vaulting-zombie/jumping-6.png',
    '/sprites/zombies/pole-vaulting-zombie/on-air-1.png',
    '/sprites/zombies/pole-vaulting-zombie/on-air-10.png',
    '/sprites/zombies/pole-vaulting-zombie/on-air-2.png',
    '/sprites/zombies/pole-vaulting-zombie/on-air-3.png',
    '/sprites/zombies/pole-vaulting-zombie/on-air-4.png',
    '/sprites/zombies/pole-vaulting-zombie/on-air-5.png',
    '/sprites/zombies/pole-vaulting-zombie/on-air-6.png',
    '/sprites/zombies/pole-vaulting-zombie/on-air-7.png',
    '/sprites/zombies/pole-vaulting-zombie/on-air-8.png',
    '/sprites/zombies/pole-vaulting-zombie/on-air-9.png',
    '/sprites/zombies/pole-vaulting-zombie/reference.png',
    '/sprites/zombies/pole-vaulting-zombie/running-1.png',
    '/sprites/zombies/pole-vaulting-zombie/running-2.png',
    '/sprites/zombies/pole-vaulting-zombie/running-3.png',
    '/sprites/zombies/pole-vaulting-zombie/stick-1.png',
    '/sprites/zombies/pole-vaulting-zombie/stick-10.png',
    '/sprites/zombies/pole-vaulting-zombie/stick-2.png',
    '/sprites/zombies/pole-vaulting-zombie/stick-3.png',
    '/sprites/zombies/pole-vaulting-zombie/stick-4.png',
    '/sprites/zombies/pole-vaulting-zombie/stick-5.png',
    '/sprites/zombies/pole-vaulting-zombie/stick-6.png',
    '/sprites/zombies/pole-vaulting-zombie/stick-7.png',
    '/sprites/zombies/pole-vaulting-zombie/stick-8.png',
    '/sprites/zombies/pole-vaulting-zombie/stick-9.png',
    '/sprites/zombies/pole-vaulting-zombie/walking-1.png',
    '/sprites/zombies/pole-vaulting-zombie/walking-2.png',
    '/sprites/zombies/pole-vaulting-zombie/walking-3.png',
    '/sprites/zombies/zombie/arm.png',
    '/sprites/zombies/zombie/fired-1.png',
    '/sprites/zombies/zombie/fired-10.png',
    '/sprites/zombies/zombie/fired-2.png',
    '/sprites/zombies/zombie/fired-3.png',
    '/sprites/zombies/zombie/fired-4.png',
    '/sprites/zombies/zombie/fired-5.png',
    '/sprites/zombies/zombie/fired-6.png',
    '/sprites/zombies/zombie/fired-7.png',
    '/sprites/zombies/zombie/fired-8.png',
    '/sprites/zombies/zombie/fired-9.png',
    '/sprites/zombies/zombie/headless-1.png',
    '/sprites/zombies/zombie/headless-10.png',
    '/sprites/zombies/zombie/headless-2.png',
    '/sprites/zombies/zombie/headless-3.png',
    '/sprites/zombies/zombie/headless-4.png',
    '/sprites/zombies/zombie/headless-5.png',
    '/sprites/zombies/zombie/headless-6.png',
    '/sprites/zombies/zombie/headless-7.png',
    '/sprites/zombies/zombie/headless-8.png',
    '/sprites/zombies/zombie/headless-9.png',
    '/sprites/zombies/zombie/walking-1.png',
    '/sprites/zombies/zombie/walking-2.png',
    '/sprites/zombies/zombie/walking-3.png',
    '/sprites/zombies/zombie/walking-middle-1.png',
    '/sprites/zombies/zombie/walking-middle-2.png',
    '/sprites/zombies/zombie/walking-middle-3.png',
  ]
  const mm = document.querySelector('#multimedia')!
  for (const src of allSrc) {
    const img = new Image()
    img.loading = 'eager'
    img.src = src
    mm.appendChild(img)
  }
}

async function loadAllAudios() {
  const allSrc = [
    'audios/effect/readysetplant.ogg',
    'audios/env/awooga.ogg',
    'audios/env/hugewave.ogg',
    'audios/env/lawnmower.ogg',
    'audios/env/losemusic.ogg',
    'audios/env/siren.ogg',
    'audios/env/winmusic.ogg',
    'audios/music/grasswalk.mp3',
    'audios/plant.ogg',
    'audios/plant2.ogg',
    'audios/plants/pea/splat.ogg',
    'audios/plants/pea/splat2.ogg',
    'audios/plants/pea/splat3.ogg',
    'audios/plants/peashooter/throw.ogg',
    'audios/plants/peashooter/throw2.ogg',
    'audios/plants/potato-mine/potato_mine.ogg',
    'audios/points.ogg',
    'audios/zombies/chomp.ogg',
    'audios/zombies/chomp2.ogg',
    'audios/zombies/groan.ogg',
    'audios/zombies/groan2.ogg',
    'audios/zombies/groan3.ogg',
    'audios/zombies/groan4.ogg',
    'audios/zombies/groan5.ogg',
    'audios/zombies/groan6.ogg',
  ]

  for (const src of allSrc) {
    const audio = new Audio(src)
    audio.preload = 'auto'
  }
}

export async function loadAllMedia() {
  loadAllAudios()
  loadAllImages()
}
