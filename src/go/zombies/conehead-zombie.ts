import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { zombieAnimation } from './_zombie'
import Zombie from './_zombie'
import AnimationObject from './animations/_animation'

const [e1, e2, e3] = importSpriteSheet(
  '/sprites/zombies/conehead-zombie/eat.png',
  new Vector2(16),
  3
)
const [em1, em2, em3] = importSpriteSheet(
  '/sprites/zombies/conehead-zombie/eat-middle.png',
  new Vector2(16),
  3
)
const [w1, w2, w3] = importSpriteSheet(
  '/sprites/zombies/conehead-zombie/walking.png',
  new Vector2(16),
  3
)
const [wm1, wm2, wm3] = importSpriteSheet(
  '/sprites/zombies/conehead-zombie/walking-middle.png',
  new Vector2(16),
  3
)

const coneheadZombieAnimation = {
  'c-full-eat': {
    sprites: [e1, e2, e1, e3],
    fps: 4,
  },
  'c-full': {
    sprites: [w1, w2, w3, w2],
    fps: 5,
  },
  'c-middle-eat': {
    sprites: [em1, em2, em1, em3],
    fps: 4,
  },
  'c-middle': {
    sprites: [wm1, wm2, wm3, wm2],
    fps: 5,
  },
  ...zombieAnimation,
}

export default class ConeheadZombie extends Zombie {
  animationList = new AnimatedSpritesList(
    this.transform,
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
      importSpriteSheet(
        '/sprites/zombies/conehead-zombie/cone-breaked.png',
        new Vector2(16),
        10
      ),
      10,
      { loop: false }
    )
  }
}
