import { GameObject, ctx } from '../../../game-engine/game-object'
import Button from '../../../_mods-ge/button'
import Vector2 from '../../../game-engine/utilities/vector2'
import { scenes } from '../../../manager/scenes-manager'
import Lobby from '../../../scenes/lobby'
import { pauseGame } from '../../../game-engine/lib/update'
import { GameObjectTypes } from '../../../utilities/enums'
import Time from '../../../game-engine/utilities/time'
import { getImage } from '../../../game-engine/utilities/media-manager/media-storage'

const pauseView = getImage('/sprites/ui/views/pause-menu/menu.png')

export default class PauseMenu extends GameObject {
  arr

  constructor() {
    super(GameObjectTypes.UI, new Vector2(136, 0))

    const bd = new Backdrop(() => {
      this.play()
    })
    const c = new Continue(() => {
      this.play()
    })
    const r = new Restart(() => {
      this.play()
      scenes.reloadScene()
    })
    const e = new Exit(() => {
      this.play()
      scenes.changeScene(Lobby)
    })

    this.arr = [bd, c, r, e]
  }

  play() {
    Time.timeRate = 1
    this.hide = true
    this.arr.forEach((a) => (a.hide = true))
    this.destroy()
    this.onPlay()
  }

  pause() {
    this.hide = false
    this.arr.forEach((a) => (a.hide = false))
  }

  onPlay() {}

  draw() {
    ctx.beginPath()
    ctx.fillStyle = '#0008'
    ctx.filter = 'blur(4px)'
    ctx.fillRect(0, 0, Vector2.SCREEN.x, Vector2.SCREEN.y)
    ctx.filter = 'none'
    ctx.drawImage(pauseView, this.transform.x, this.transform.y)
    pauseGame()
    ctx.closePath()
  }

  destroy(): void {
    this.arr.forEach((a) => a.destroy())
    super.destroy()
  }
}

class Backdrop extends Button {
  constructor(onClick: () => void) {
    super(new Vector2(0, 0), new Vector2(136, 112))
    this.onClick = () => {
      onClick()
    }
    this.clickable.invulnerable = true
  }
}

class Continue extends Button {
  constructor(onClick: () => void) {
    super(new Vector2(140, 40), new Vector2(48, 22))
    this.onClick = () => {
      onClick()
    }
    this.clickable.invulnerable = true
  }
}
class Restart extends Button {
  constructor(onClick: () => void) {
    super(new Vector2(140, 64), new Vector2(48, 22))
    this.onClick = () => {
      onClick()
    }
    this.clickable.invulnerable = true
  }
}
class Exit extends Button {
  constructor(onClick: () => void) {
    super(new Vector2(140, 88), new Vector2(48, 22))
    this.onClick = () => {
      onClick()
    }
    this.clickable.invulnerable = true
  }
}
