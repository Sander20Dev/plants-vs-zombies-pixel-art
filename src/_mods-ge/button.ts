import { GameObjectTypes } from '../utilities/enums'
import { GameObject } from '../game-engine/game-object'
import { SpritesList } from '../game-engine/nodes/animated-sprites-list'
import Clickable from '../game-engine/nodes/clickable'
import Vector2 from '../game-engine/utilities/vector2'
import SpriteTexture from '../game-engine/utilities/sprite'

export default class Button extends GameObject {
  spriteList
  clickable

  constructor(
    pos: Vector2,
    public scale: Vector2,
    sprites?: { normal: SpriteTexture; active?: SpriteTexture }
  ) {
    super(GameObjectTypes.UI, pos)

    this.spriteList =
      sprites &&
      new SpritesList(
        this.transform,
        {
          normal: sprites.normal,
          ...(sprites.active
            ? {
                active: sprites.active,
              }
            : {}),
        },
        'normal'
      )

    this.clickable = new Clickable(
      this.transform,
      this.scale,
      () => {
        this.onClick()
      },
      () => {
        this.onActive()
        if (!this.spriteList) return
        if (sprites && sprites.active) {
          this.spriteList.setCurrentAnimation('active')
        } else {
          this.spriteList.filters = 'brightness(0.7)'
        }
      }
    )
    this.clickable.onMouseOver = () => {
      if (!this.spriteList) return

      this.spriteList.filters = 'none'
      this.spriteList.setCurrentAnimation('normal')
    }

    this.nodes = [this.clickable, ...(this.spriteList ? [this.spriteList] : [])]
  }

  onClick() {}
  onActive() {}
}
