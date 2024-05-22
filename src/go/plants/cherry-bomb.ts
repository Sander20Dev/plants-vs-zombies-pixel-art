import AnimatedSprite from '../../classes/nodes/animated-sprite'
import Vector2 from '../../classes/vector2'
import { getCollide } from '../../utilities/collide'
import { GameObjectTypes } from '../../utilities/enums'
import { PLANTS } from '../../utilities/enums/plants'
import Zombie from '../zombies/_zombie'
import AnimationObject from '../zombies/animations/_animation'
import Plant from './plant'

export default class CherryBomb extends Plant {
  animation = new AnimatedSprite(
    this.transform,
    new Vector2(16, 16),
    [
      '/sprites/plants/cherry-bomb/explotion-1.png',
      '/sprites/plants/cherry-bomb/explotion-2.png',
      '/sprites/plants/cherry-bomb/explotion-3.png',
      '/sprites/plants/cherry-bomb/explotion-4.png',
      '/sprites/plants/cherry-bomb/explotion-5.png',
      '/sprites/plants/cherry-bomb/explotion-6.png',
    ],
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
      [
        '/sprites/plants/cherry-bomb/boomb-1.png',
        '/sprites/plants/cherry-bomb/boomb-2.png',
        '/sprites/plants/cherry-bomb/boomb-3.png',
        '/sprites/plants/cherry-bomb/boomb-4.png',
        '/sprites/plants/cherry-bomb/boomb-5.png',
        '/sprites/plants/cherry-bomb/boomb-6.png',
        '/sprites/plants/cherry-bomb/boomb-7.png',
        '/sprites/plants/cherry-bomb/boomb-8.png',
        '/sprites/plants/cherry-bomb/boomb-9.png',
        '/sprites/plants/cherry-bomb/boomb-10.png',
      ],
      10,
      new Vector2(48, 48),
      { loop: false }
    )
  }
}
