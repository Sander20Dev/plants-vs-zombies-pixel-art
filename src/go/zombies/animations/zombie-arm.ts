import { GameObject } from '../../../classes/game-object'
import AnimatedSprite from '../../../classes/nodes/animated-sprite'
import Vector2 from '../../../classes/vector2'
import { GameObjectTypes } from '../../../utilities/enums'

export default class ZombieArm extends GameObject {
  animation

  constructor(pos: Vector2) {
    super(GameObjectTypes.ANIMATION, pos)
    this.animation = new AnimatedSprite(
      this.transform,
      new Vector2(16, 16),
      [
        '/sprites/zombies/arm/normal-arm-falling-1.png',
        '/sprites/zombies/arm/normal-arm-falling-2.png',
        '/sprites/zombies/arm/normal-arm-falling-3.png',
        '/sprites/zombies/arm/normal-arm-falling-4.png',
        '/sprites/zombies/arm/normal-arm-falling-5.png',
        '/sprites/zombies/arm/normal-arm-falling-6.png',
        '/sprites/zombies/arm/normal-arm-falling-7.png',
        '/sprites/zombies/arm/normal-arm-falling-8.png',
        '/sprites/zombies/arm/normal-arm-falling-9.png',
        '/sprites/zombies/arm/normal-arm-falling-10.png',
      ],
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
