import Time from '../utilities/time'
import { ctx } from '../game-object'
import Vector2 from '../utilities/vector2'
import NodeAbs from './node'
import SpriteTexture from '../utilities/sprite'

export default class AnimatedSprite extends NodeAbs {
  #animations
  #fps
  options

  filter = 'none'

  constructor(
    public transform: Vector2,
    animationSrcs: SpriteTexture[],
    fps: number,
    { loop = true } = {}
  ) {
    super()

    if (loop) {
      this.played = true
    }
    this.options = { loop }

    this.#animations = animationSrcs

    this.#fps = 1 / fps
    this.onChange(0)
  }

  ignore = false

  currentAnimation = 0
  #counter = 0

  play() {
    this.played = true
    this.onChange(0)
  }

  played = false

  onEnd() {}

  changeFPS(fps: number) {
    this.#fps = 1 / fps
  }
  changeAnAnimation(index: number, src: string | SpriteTexture) {
    if (src instanceof SpriteTexture) {
      if (src.img.src === this.#animations[index].img.src) return

      this.#animations[index] = src
    } else {
      if (src === this.#animations[index].img.src) return

      this.#animations[index] = new SpriteTexture(src)
    }
  }
  setAnimationIndex(index: number) {
    this.currentAnimation = index
  }

  onChange(currentAnimationIndex: number): void
  onChange() {}

  draw(props?: { filter?: string; flip?: boolean }): void
  draw({ filter = undefined, flip = false } = {}) {
    if (filter) {
      ctx.filter = filter
    } else {
      ctx.filter = this.filter
    }

    if (flip) {
      ctx.save()
      ctx.scale(-1, 1)

      this.#animations[this.currentAnimation].draw(
        -this.transform.x -
          (this.#animations[this.currentAnimation].size
            ? this.#animations[this.currentAnimation].size!.x
            : 16),
        this.transform.y
      )
    } else {
      this.#animations[this.currentAnimation].draw(
        this.transform.x,
        this.transform.y
      )
    }

    ctx.restore()

    ctx.filter = 'none'
  }

  update() {
    if (this.#animations.length < 1) return

    let end = false

    if (this.played) {
      this.#counter += Time.deltaTime

      if (this.#counter > this.#fps) {
        this.currentAnimation++
        this.#counter -= this.#fps

        if (!this.options.loop) {
          if (this.currentAnimation >= this.#animations.length && this.played) {
            this.currentAnimation = this.#animations.length - 1
            this.played = false
            end = true
          }
        } else {
          if (this.currentAnimation >= this.#animations.length) {
            this.currentAnimation = 0
          }
        }

        if (!end) this.onChange(this.currentAnimation)
      }
    }

    if (end) this.onEnd()
  }
}
