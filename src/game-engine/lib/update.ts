import { canvas, ctx } from '../../utilities/drawing'
import { Views } from './loader'
import { inputController } from '../utilities/input'
import Time from '../utilities/time'
import { audios } from '../utilities/media-manager/media-storage'

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
      gameObj.events.update.forEach((event) => event(Time.deltaTime))
    }

    if (Time.timeRate !== 0) {
      Time.deltaTime = delta
      gameObj.priority()
      Time.deltaTime = delta * timeRate
    } else {
      gameObj.priority()
    }
    ctx.beginPath()
    ctx.fillStyle = '#4C73E488'
    // ctx.moveTo(gameObj.transform.x + gameObj.collision.transform.x,
    //   gameObj.transform.y + gameObj.collision.transform.y)
    // ctx.lineTo(gameObj.transform.x + gameObj.collision.transform.x + gameObj.collision.scale.x, gameObj.transform.y + gameObj.collision.transform.y)
    // ctx.lineTo(gameObj.transform.x + gameObj.collision.transform.x + gameObj.collision.scale.x, gameObj.transform.y + gameObj.collision.transform.y + gameObj.collision.scale.y)
    // ctx.lineTo(gameObj.transform.x + gameObj.collision.transform.x, gameObj.transform.y + gameObj.collision.transform.y + gameObj.collision.scale.y)
    // ctx.lineTo(gameObj.transform.x + gameObj.collision.transform.x, gameObj.transform.y + gameObj.collision.transform.y)
    // ctx.fill()
    ctx.lineWidth = 0.5
    ctx.strokeStyle = '#3D4E7E88'
    ctx.strokeRect(
      gameObj.transform.x + gameObj.collision.transform.x,
      gameObj.transform.y + gameObj.collision.transform.y,
      gameObj.collision.scale.x,
      gameObj.collision.scale.y
    )
    ctx.fillRect(
      gameObj.transform.x + gameObj.collision.transform.x,
      gameObj.transform.y + gameObj.collision.transform.y,
      gameObj.collision.scale.x,
      gameObj.collision.scale.y
    )
    ctx.closePath()
    gameObj.draw()
  }

  inputController.update()

  window.requestAnimationFrame(update)
}

export function pauseGame() {
  Time.timeRate = 0
}
