import AnimatedSpritesList from '../../classes/nodes/animated-sprites-list'
import Vector2 from '../../classes/vector2'
import { zombieAnimation } from './_zombie'
import Zombie from './_zombie'

const coneheadZombieAnimation = {
  'c-full': {
    srcs: [
      '/sprites/zombies/conehead-zombie/walking-1.png',
      '/sprites/zombies/conehead-zombie/walking-2.png',
      '/sprites/zombies/conehead-zombie/walking-3.png',
      '/sprites/zombies/conehead-zombie/walking-2.png',
    ],
    fps: 5,
  },
  'c-middle': {
    srcs: [
      '/sprites/zombies/conehead-zombie/walking-middle-1.png',
      '/sprites/zombies/conehead-zombie/walking-middle-2.png',
      '/sprites/zombies/conehead-zombie/walking-middle-3.png',
      '/sprites/zombies/conehead-zombie/walking-middle-2.png',
    ],
    fps: 5,
  },
  ...zombieAnimation,
}

export default class ConeheadZombie extends Zombie {
  animationList = new AnimatedSpritesList(
    this.transform,
    new Vector2(16, 16),
    coneheadZombieAnimation,
    'c-full'
  )

  nodes = [this.animationList]

  setAnimation(): void {
    if (this.health > 370) {
      this.animationList.setCurrentAnimation('c-full')
      return
    }
    if (this.health > 181) {
      this.animationList.setCurrentAnimation('c-middle')
      return
    }
    super.setAnimation()
  }

  constructor(pos: Vector2) {
    super(pos, 551)
  }
}
