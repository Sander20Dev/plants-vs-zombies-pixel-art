import AnimatedSprite from '../../game-engine/nodes/animated-sprite'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { getCollide } from '../../utilities/collide'
import { GameObjectTypes } from '../../utilities/enums'
import { PLANTS } from '../../utilities/enums/plants'
import Zombie from '../zombies/_zombie'
import AnimationObject from '../zombies/animations/_animation'
import Plant from './plant'

export default class CherryBomb extends Plant {
  animation = new AnimatedSprite(
    this.transform,
    importSpriteSheet(
      '/sprites/plants/cherry-bomb/explotion.png',
      new Vector2(16),
      6
    ),
    5,
    { loop: false }
  )
  nodes = [this.animation]
  constructor(pos: Vector2) {
    super(pos, PLANTS.CHERRY_BOMB)
    this.animation.play()

    this.animation.onEnd = () => {
      const zombies = getCollide(
        this.transform.x - 16,
        this.transform.y - 16,
        48,
        48,
        GameObjectTypes.ZOMBIE
      )

      for (const zombie of zombies) {
        if (!(zombie instanceof Zombie)) continue
        zombie.attack(this.damage, 'fire')
      }

      new Booomb(this.transform.add(new Vector2(-16, -16)))
      this.destroy()
    }
  }
}

class Booomb extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      importSpriteSheet(
        '/sprites/plants/cherry-bomb/boomb.png',
        new Vector2(48),
        10
      ),
      10,
      { loop: false }
    )
  }
}
