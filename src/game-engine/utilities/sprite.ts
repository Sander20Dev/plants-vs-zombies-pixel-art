import { ctx } from '../game-object'
import { getImage } from './media-manager/media-storage'
import Vector2 from './vector2'

export default class SpriteTexture {
  img: HTMLImageElement
  constructor(
    src: string | HTMLImageElement,
    sub: Vector2 = Vector2.ZERO,
    size?: Vector2
  ) {
    this.img = src instanceof HTMLImageElement ? src : getImage(src)

    if (size) {
      this.draw = (x: number, y: number) => {
        ctx.drawImage(
          this.img,
          sub.x,
          sub.y,
          size.x,
          size.y,
          x,
          y,
          size.x,
          size.y
        )
      }
    } else {
      this.draw = (x: number, y: number) => {
        ctx.drawImage(this.img, x, y)
      }
    }
  }

  draw(x: number, y: number): void
  draw() {}
}

export function importSpriteSheet(src: string, size: Vector2, columns: number) {
  return Array(columns)
    .fill(0)
    .map((_, i) => new SpriteTexture(src, new Vector2(i * size.x, 0), size))
}
