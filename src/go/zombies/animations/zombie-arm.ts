import { GameObject } from '../../../game-engine/game-object'
import AnimatedSprite from '../../../game-engine/nodes/animated-sprite'
import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import Vector2 from '../../../game-engine/utilities/vector2'
import { GameObjectTypes } from '../../../utilities/enums'

export default class ZombieArm extends GameObject {
  animation

  constructor(pos: Vector2) {
    super(GameObjectTypes.ANIMATION, pos)
    this.animation = new AnimatedSprite(
      this.transform,
      importSpriteSheet(
        '/sprites/zombies/arm/normal-arm-falling.png',
        new Vector2(16),
        10
      ),
      10,
      { loop: false }
    )

    this.nodes = [this.animation]

    this.animation.play()
    this.animation.onEnd = () => {
      this.destroy()
    }
  }
}
