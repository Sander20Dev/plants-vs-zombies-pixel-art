import AnimatedSpritesList from '../../classes/nodes/animated-sprites-list'
import Vector2 from '../../classes/vector2'
import { zombieAnimation } from './_zombie'
import Zombie from './_zombie'
import AnimationObject from './animations/_animation'

const bucketheadZombieAnimation = {
  'b-full-eat': {
    srcs: [
      '/sprites/zombies/buckethead-zombie/eat-1.png',
      '/sprites/zombies/buckethead-zombie/eat-2.png',
      '/sprites/zombies/buckethead-zombie/eat-1.png',
      '/sprites/zombies/buckethead-zombie/eat-3.png',
    ],
    fps: 4,
  },
  'b-full': {
    srcs: [
      '/sprites/zombies/buckethead-zombie/walking-1.png',
      '/sprites/zombies/buckethead-zombie/walking-2.png',
      '/sprites/zombies/buckethead-zombie/walking-3.png',
      '/sprites/zombies/buckethead-zombie/walking-2.png',
    ],
    fps: 5,
  },
  'b-middle-eat': {
    srcs: [
      '/sprites/zombies/buckethead-zombie/eat-middle-1.png',
      '/sprites/zombies/buckethead-zombie/eat-middle-2.png',
      '/sprites/zombies/buckethead-zombie/eat-middle-1.png',
      '/sprites/zombies/buckethead-zombie/eat-middle-3.png',
    ],
    fps: 4,
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
      this.currentAnimation = 'b-full'
      return
    }
    if (this.health > 181) {
      this.currentAnimation = 'b-middle'
      return
    }
    super.setAnimation()
  }

  onChangeAnimation(currentAnimation: string): void {
    if (currentAnimation.includes('z-normal')) {
      new BucketBreaked(this.transform.add(Vector2.ZERO))
    }
    super.onChangeAnimation(currentAnimation)
  }

  constructor(pos: Vector2) {
    super(pos, 1281)
    this.init()
  }
}

class BucketBreaked extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      [
        '/sprites/zombies/buckethead-zombie/bucket-breaked-1.png',
        '/sprites/zombies/buckethead-zombie/bucket-breaked-2.png',
        '/sprites/zombies/buckethead-zombie/bucket-breaked-3.png',
        '/sprites/zombies/buckethead-zombie/bucket-breaked-4.png',
        '/sprites/zombies/buckethead-zombie/bucket-breaked-5.png',
        '/sprites/zombies/buckethead-zombie/bucket-breaked-6.png',
        '/sprites/zombies/buckethead-zombie/bucket-breaked-7.png',
        '/sprites/zombies/buckethead-zombie/bucket-breaked-8.png',
        '/sprites/zombies/buckethead-zombie/bucket-breaked-9.png',
        '/sprites/zombies/buckethead-zombie/bucket-breaked-10.png',
      ],
      10,
      Vector2.ZERO,
      { loop: false }
    )
  }
}
