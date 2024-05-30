import { GameObject } from '../../../game-engine/game-object'
import AnimatedSprite from '../../../game-engine/nodes/animated-sprite'
import SpriteTexture from '../../../game-engine/utilities/sprite'
import Vector2 from '../../../game-engine/utilities/vector2'
import { GameObjectTypes } from '../../../utilities/enums'

export default class AnimationObject extends GameObject {
  animation
  constructor(
    pos: Vector2,
    srcs: SpriteTexture[],
    fps: number,
    options?: { loop?: boolean }
  ) {
    super(GameObjectTypes.ANIMATION, pos)
    const animation = new AnimatedSprite(pos, srcs, fps, options)
    this.animation = animation
    this.nodes = [animation]
    animation.play()

    animation.onEnd = () => this.destroy()
  }
}
