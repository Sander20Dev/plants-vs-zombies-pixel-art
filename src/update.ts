import { canvas, ctx } from './classes/game-object'
import { Views } from './loader'
import { inputController } from './utilities/importants/input'
import Time from './utilities/importants/time'
import { audios } from './utilities/media-storage'

let timer = 0

let globalVolume = 0.5

export default function initGame() {
  window.requestAnimationFrame((time) => {
    timer = time
    window.requestAnimationFrame(update)
  })
}
export function start() {
  Time.timeRate = 1
}

function update(time: number) {
  const delta = (time - timer) / 1000
  timer = time

  audios.forEach((audio) => {
    audio.playbackRate = Time.timeRate
    audio.volume = globalVolume
  })
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const all = Views.all()

  for (const gameObj of all) {
    if (gameObj == null) continue

    if (gameObj.hide) continue

    const timeRate = Time.timeRate * gameObj.localTimeRate
    Time.deltaTime = delta * timeRate

    if (timeRate !== 0) {
      gameObj.nodesUpdate(() => gameObj.collision.update())
    }
    gameObj.nodesUpdate(() => gameObj.collision.draw())

    for (const node of gameObj.nodes) {
      if (node.ignore) continue

      if (timeRate !== 0) {
        gameObj.nodesUpdate((tr) => node.update(tr))
      }
      gameObj.nodesUpdate(() => node.draw())
    }

    if (timeRate !== 0) {
      gameObj.update()
    }
    gameObj.priority()
    gameObj.draw()
  }

  inputController.update()

  window.requestAnimationFrame(update)
}

export function pauseGame() {
  Time.timeRate = 0
}
