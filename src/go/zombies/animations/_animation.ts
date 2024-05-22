import { GameObject } from '../../../classes/game-object'
import AnimatedSprite from '../../../classes/nodes/animated-sprite'
import Vector2 from '../../../classes/vector2'
import { GameObjectTypes } from '../../../utilities/enums'

export default class AnimationObject extends GameObject {
  animation
  constructor(
    pos: Vector2,
    srcs: string[],
    fps: number,
    size: Vector2,
    options?: { loop?: boolean }
  ) {
    super(GameObjectTypes.ANIMATION, pos)
    const animation = new AnimatedSprite(pos, size, srcs, fps, options)
    this.animation = animation
    this.nodes = [animation]
    animation.play()

    animation.onEnd = () => this.destroy()
  }
}
