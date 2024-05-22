import AnimatedSpritesList from '../../classes/nodes/animated-sprites-list'
import Vector2 from '../../classes/vector2'
import { zombieAnimation } from './_zombie'
import Zombie from './_zombie'

const bucketheadZombieAnimation = {
  'b-full': {
    srcs: [
      '/sprites/zombies/buckethead-zombie/walking-1.png',
      '/sprites/zombies/buckethead-zombie/walking-2.png',
      '/sprites/zombies/buckethead-zombie/walking-3.png',
      '/sprites/zombies/buckethead-zombie/walking-2.png',
    ],
    fps: 5,
  },
  'b-middle': {
    srcs: [
      '/sprites/zombies/buckethead-zombie/walking-middle-1.png',
      '/sprites/zombies/buckethead-zombie/walking-middle-2.png',
      '/sprites/zombies/buckethead-zombie/walking-middle-3.png',
      '/sprites/zombies/buckethead-zombie/walking-middle-2.png',
    ],
    fps: 5,
  },
  ...zombieAnimation,
}

export default class BucketheadZombie extends Zombie {
  animationList = new AnimatedSpritesList(
    this.transform,
    new Vector2(16, 16),
    bucketheadZombieAnimation,
    'b-full'
  )

  nodes = [this.animationList]

  setAnimation(): void {
    if (this.health > 1100) {
      this.animationList.setCurrentAnimation('b-full')
      return
    }
    if (this.health > 181) {
      this.animationList.setCurrentAnimation('b-middle')
      return
    }
    super.setAnimation()
  }

  constructor(pos: Vector2) {
    super(pos, 1281)
  }
}
