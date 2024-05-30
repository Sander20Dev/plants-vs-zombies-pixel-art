import { getImage } from '../utilities/media-manager/media-storage'
import { ctx } from '../game-object'
import Vector2 from '../utilities/vector2'
import NodeAbs from './node'
import SpriteTexture from '../utilities/sprite'

export default class Sprite extends NodeAbs {
  #sprite
  constructor(
    src: string | HTMLImageElement | SpriteTexture,
    public transform: Vector2,
    public options: { rawCoords?: boolean } = {}
  ) {
    super()

    const img = typeof src === 'string' ? getImage(src) : src
    this.#sprite = img instanceof SpriteTexture ? img : new SpriteTexture(img)
  }

  ignore = false
  filters = 'none'
  draw() {
    ctx.filter = this.filters

    if (this.options.rawCoords === true) {
      this.#sprite.draw(this.transform.x, this.transform.y)
    } else {
      this.#sprite.draw(this.transform.roundedX, this.transform.roundedY)
    }
    ctx.filter = 'none'
  }
}
