import AnimatedSpritesList from '../../classes/nodes/animated-sprites-list'
import Vector2 from '../../classes/vector2'
import { zombieAnimation } from './_zombie'
import Zombie from './_zombie'
import AnimationObject from './animations/_animation'

const coneheadZombieAnimation = {
  'c-full-eat': {
    srcs: [
      '/sprites/zombies/conehead-zombie/eat-1.png',
      '/sprites/zombies/conehead-zombie/eat-2.png',
      '/sprites/zombies/conehead-zombie/eat-1.png',
      '/sprites/zombies/conehead-zombie/eat-3.png',
    ],
    fps: 4,
  },
  'c-full': {
    srcs: [
      '/sprites/zombies/conehead-zombie/walking-1.png',
      '/sprites/zombies/conehead-zombie/walking-2.png',
      '/sprites/zombies/conehead-zombie/walking-3.png',
      '/sprites/zombies/conehead-zombie/walking-2.png',
    ],
    fps: 5,
  },
  'c-middle-eat': {
    srcs: [
      '/sprites/zombies/conehead-zombie/eat-middle-1.png',
      '/sprites/zombies/conehead-zombie/eat-middle-2.png',
      '/sprites/zombies/conehead-zombie/eat-middle-1.png',
      '/sprites/zombies/conehead-zombie/eat-middle-3.png',
    ],
    fps: 4,
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
      this.currentAnimation = 'c-full'
      return
    }
    if (this.health > 181) {
      this.currentAnimation = 'c-middle'
      return
    }
    super.setAnimation()
  }

  onChangeAnimation(currentAnimation: string): void {
    if (currentAnimation.includes('z-normal')) {
      new ConeBreaked(this.transform.add(Vector2.ZERO))
    }
    super.onChangeAnimation(currentAnimation)
  }

  constructor(pos: Vector2) {
    super(pos, 551)
    this.init()
  }
}

class ConeBreaked extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      [
        '/sprites/zombies/conehead-zombie/cone-breaked-1.png',
        '/sprites/zombies/conehead-zombie/cone-breaked-2.png',
        '/sprites/zombies/conehead-zombie/cone-breaked-3.png',
        '/sprites/zombies/conehead-zombie/cone-breaked-4.png',
        '/sprites/zombies/conehead-zombie/cone-breaked-5.png',
        '/sprites/zombies/conehead-zombie/cone-breaked-6.png',
        '/sprites/zombies/conehead-zombie/cone-breaked-7.png',
        '/sprites/zombies/conehead-zombie/cone-breaked-8.png',
        '/sprites/zombies/conehead-zombie/cone-breaked-9.png',
      ],
      6,
      Vector2.ZERO,
      { loop: false }
    )
  }
}
