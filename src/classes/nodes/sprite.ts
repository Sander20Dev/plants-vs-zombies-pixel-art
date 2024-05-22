import { getImage } from '../../utilities/media-storage'
import { ctx } from '../game-object'
import Vector2 from '../vector2'
import NodeAbs from './node'

export default class Sprite extends NodeAbs {
  #sprite
  constructor(
    src: string | HTMLImageElement,
    public transform: Vector2,
    public scale: Vector2,
    public options: { rawCoords?: boolean } = {}
  ) {
    super()

    this.#sprite = typeof src === 'string' ? getImage(src) : src
  }

  ignore = false
  filters = 'none'
  draw() {
    ctx.filter = this.filters

    if (this.options.rawCoords === true) {
      ctx.drawImage(this.#sprite, this.transform.x, this.transform.y)
    } else {
      ctx.drawImage(
        this.#sprite,
        this.transform.roundedX,
        this.transform.roundedY
      )
    }
    ctx.filter = 'none'
  }
}
