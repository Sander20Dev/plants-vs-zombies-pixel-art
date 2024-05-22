import { GameObjectTypes } from '../../utilities/enums'
import { GameObject } from '../game-object'
import AnimatedSpritesList from '../nodes/animated-sprites-list'
import Clickable from '../nodes/clickable'
import Vector2 from '../vector2'

export default class Button extends GameObject {
  spriteList
  clickable

  constructor(
    pos: Vector2,
    public scale: Vector2,
    sprites?: { normal: string; active?: string }
  ) {
    super(GameObjectTypes.UI, pos)

    this.spriteList =
      sprites &&
      new AnimatedSpritesList(
        this.transform,
        this.scale,
        {
          normal: {
            srcs: [sprites.normal],
            fps: 1,
          },
          ...(sprites.active
            ? {
                active: {
                  srcs: [sprites.active],
                  fps: 1,
                },
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
