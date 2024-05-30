import SpriteTexture from '../utilities/sprite'
import Vector2 from '../utilities/vector2'
import AnimatedSprite from './animated-sprite'
import NodeAbs from './node'
import Sprite from './sprite'

export default class AnimatedSpritesList extends NodeAbs {
  ignore = false

  animations
  currentAnimationName

  constructor(
    transform: Vector2,
    animations: Record<
      string,
      { sprites: SpriteTexture[]; fps: number; loop?: boolean }
    >,
    currentAnimation: string
  ) {
    super()
    this.animations = Object.entries(animations)
      .map(([name, { sprites, fps, loop }]) => ({
        name,
        animation: new AnimatedSprite(transform, sprites, fps, { loop }),
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
    if (this.animations[animationName] instanceof AnimatedSprite) {
      ;(this.animations[animationName] as AnimatedSprite).currentAnimation =
        animationIndex
      if (play) (this.animations[animationName] as AnimatedSprite).play()
    }

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

export class SpritesList extends NodeAbs {
  ignore = false

  sprites
  currentAnimationName

  constructor(
    transform: Vector2,
    sprites: Record<string, SpriteTexture>,
    currentAnimation: string
  ) {
    super()
    this.sprites = Object.entries(sprites)
      .map(([name, sprite]) => ({
        name,
        animation: new Sprite(sprite, transform),
      }))
      .reduce<Record<string, Sprite>>(
        (obj, { name, animation }) => ({ ...obj, [name]: animation }),
        {}
      )

    this.currentAnimationName = currentAnimation
  }

  onChangeAnimation(currentAnimation: string): void
  onChangeAnimation() {}

  filters = 'none'

  setCurrentAnimation(animationName: string) {
    if (animationName === this.currentAnimationName) return
    if (this.sprites[animationName] == null) return
    this.currentAnimationName = animationName

    this.onChangeAnimation(animationName)
  }

  get currentAnimation() {
    return this.sprites[this.currentAnimationName]
  }

  draw(): void {
    this.sprites[this.currentAnimationName].filters = this.filters
    this.sprites[this.currentAnimationName].draw()
    this.sprites[this.currentAnimationName].filters = 'none'
  }
  update(): void {
    this.sprites[this.currentAnimationName].update()
  }
}
