import Vector2 from '../vector2'
import AnimatedSprite from './animated-sprite'
import NodeAbs from './node'

export default class AnimatedSpritesList extends NodeAbs {
  ignore = false

  animations
  #currentAnimation

  constructor(
    transform: Vector2,
    /** @deprecated */
    scale: Vector2,
    animations: Record<string, { srcs: string[]; fps: number; loop?: boolean }>,
    currentAnimation: string
  ) {
    super()
    this.animations = Object.entries(animations)
      .map(([name, { srcs, fps, loop }]) => ({
        name,
        animation: new AnimatedSprite(transform, scale, srcs, fps, { loop }),
      }))
      .reduce<Record<string, AnimatedSprite>>(
        (obj, { name, animation }) => ({ ...obj, [name]: animation }),
        {}
      )

    this.#currentAnimation = currentAnimation
  }

  filters = 'none'

  setCurrentAnimation(animationName: string, play = false) {
    if (animationName === this.#currentAnimation) return
    if (this.animations[animationName] == null) return
    this.#currentAnimation = animationName
    this.animations[animationName].currentAnimation = 0
    if (play) this.animations[animationName].play()
  }

  get currentAnimation() {
    return this.animations[this.#currentAnimation]
  }

  draw(): void {
    this.animations[this.#currentAnimation].draw(this.filters)
  }
  update(): void {
    this.animations[this.#currentAnimation].update()
  }
}
