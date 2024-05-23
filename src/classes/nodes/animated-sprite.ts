import Time from '../../utilities/importants/time'
import { getImage } from '../../utilities/media-storage'
import { ctx } from '../game-object'
import Vector2 from '../vector2'
import NodeAbs from './node'

export default class AnimatedSprite extends NodeAbs {
  #animations
  #fps
  options

  constructor(
    public transform: Vector2,
    public scale: Vector2,
    animationSrcs: string[],
    fps: number,
    { loop = true } = {}
  ) {
    super()

    if (loop) {
      this.played = true
    }
    this.options = { loop }

    this.#animations = animationSrcs.map((src) => {
      return getImage(src)
    })

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
  changeAnAnimation(index: number, src: string) {
    if (src === this.#animations[index].src) return

    this.#animations[index] = getImage(src)
  }
  setAnimationIndex(index: number) {
    this.currentAnimation = index
  }

  onChange(currentAnimationIndex: number): void
  onChange() {}

  draw(filter?: string): void {
    if (filter) ctx.filter = filter

    ctx.drawImage(
      this.#animations[this.currentAnimation],
      this.transform.roundedX,
      this.transform.roundedY
    )
    if (filter) ctx.filter = 'none'
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
            this.currentAnimation = 0
          } else if (this.currentAnimation + 1 >= this.#animations.length) {
            this.currentAnimation = this.currentAnimation
            this.played = false
            end = true
          }
        } else {
          if (this.currentAnimation >= this.#animations.length) {
            this.currentAnimation = 0
          }
        }

        this.onChange(this.currentAnimation)
      }
    }

    if (end) this.onEnd()
  }
}
