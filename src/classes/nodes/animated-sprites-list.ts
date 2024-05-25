import Vector2 from '../vector2'
import AnimatedSprite from './animated-sprite'
import NodeAbs from './node'

export default class AnimatedSpritesList extends NodeAbs {
  ignore = false

  animations
  currentAnimationName

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

    this.currentAnimationName = currentAnimation
  }

  onChangeAnimation(currentAnimation: string): void
  onChangeAnimation() {}

  filters = 'none'

  setCurrentAnimation(
    animationName: string,
    play = false,
    { animationIndex = 0 } = {}
  ) {
    if (animationName === this.currentAnimationName) return
    if (this.animations[animationName] == null) return
    this.currentAnimationName = animationName
    this.animations[animationName].currentAnimation = animationIndex
    if (play) this.animations[animationName].play()

    this.onChangeAnimation(animationName)
  }

  get currentAnimation() {
    return this.animations[this.currentAnimationName]
  }

  draw(): void {
    this.animations[this.currentAnimationName].draw(this.filters)
  }
  update(): void {
    this.animations[this.currentAnimationName].update()
  }
}
