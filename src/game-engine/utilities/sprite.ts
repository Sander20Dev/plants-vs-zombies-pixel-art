import { ctx } from '../game-object'
import { getImage } from './media-manager/media-storage'
import Vector2 from './vector2'

export default class SpriteTexture {
  img: HTMLImageElement
  constructor(
    src: string | HTMLImageElement,
    public sub: Vector2 = Vector2.ZERO,
    public size?: Vector2
  ) {
    this.img = src instanceof HTMLImageElement ? src : getImage(src)
  }

  draw(x: number, y: number) {
    if (this.size) {
      ctx.drawImage(
        this.img,
        this.sub.x,
        this.sub.y,
        this.size.x,
        this.size.y,
        x,
        y,
        this.size.x,
        this.size.y
      )
    } else {
      ctx.drawImage(this.img, x, y)
    }
  }

  freeDraw(
    mx: number,
    my: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ) {
    if (this.size) {
      ctx.drawImage(
        this.img,
        this.sub.x + mx,
        this.sub.y + my,
        dw,
        dh,
        dx,
        dy,
        dw,
        dh
      )
    } else {
      ctx.drawImage(this.img, mx, my, dw, dh, dx, dy, dw, dh)
    }
  }
}

export function importSpriteSheet(
  src: string,
  size: Vector2,
  columns: number,
  rows = 1,
  max?: number
) {
  return Array(max ?? columns * rows)
    .fill(0)
    .map((_, i) => {
      return new SpriteTexture(
        src,
        new Vector2((i % columns) * size.x, Math.floor(i / columns) * size.y),
        size
      )
    })
}

export class Filter {
  blur: string | null = null
  brightness: string | null = null
  contrast: string | null = null
  dropShadow: string | null = null
  grayscale: string | null = null
  hueRotate: string | null = null
  invert: string | null = null
  opacity: string | null = null
  sepia: string | null = null
  saturate: string | null = null

  toString() {
    const arr = [
      { filter: 'saturate', val: this.saturate },
      { filter: 'sepia', val: this.sepia },
      { filter: 'hue-rotate', val: this.hueRotate },
      { filter: 'brightness', val: this.brightness },
      { filter: 'contrast', val: this.contrast },
      { filter: 'grayscale', val: this.grayscale },
      { filter: 'drop-shadow', val: this.dropShadow },
      { filter: 'blur', val: this.blur },
      { filter: 'invert', val: this.invert },
      { filter: 'opacity', val: this.opacity },
    ]

    const filters = arr.filter(({ val }) => val != null)
    if (filters.length < 1) return 'none'

    return filters.map(({ filter, val }) => `${filter}(${val})`).join(' ')
  }
}
