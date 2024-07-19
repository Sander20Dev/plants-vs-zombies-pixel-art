import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { zombieAnimation } from './_zombie'
import Zombie from './_zombie'
import AnimationObject from './animations/_animation'

const [eat1, eat2, eat3] = importSpriteSheet(
  '/sprites/zombies/buckethead-zombie/eat.png',
  new Vector2(16),
  3
)
const [eatMiddle1, eatMiddle2, eatMiddle3] = importSpriteSheet(
  '/sprites/zombies/buckethead-zombie/eat-middle.png',
  new Vector2(16),
  3
)
const [walking1, walking2, walking3] = importSpriteSheet(
  '/sprites/zombies/buckethead-zombie/walking.png',
  new Vector2(16),
  3
)
const [walkingMiddle1, walkingMiddle2, walkingMiddle3] = importSpriteSheet(
  '/sprites/zombies/buckethead-zombie/walking-middle.png',
  new Vector2(16),
  3
)

const bucketheadZombieAnimation = {
  'b-full-eat': {
    sprites: [eat1, eat2, eat1, eat3],
    fps: 2,
  },
  'b-full': {
    sprites: [walking1, walking2, walking3, walking2],
    fps: 5,
  },
  'b-middle-eat': {
    sprites: [eatMiddle1, eatMiddle2, eatMiddle1, eatMiddle3],
    fps: 2,
  },
  'b-middle': {
    sprites: [walkingMiddle1, walkingMiddle2, walkingMiddle3, walkingMiddle2],
    fps: 5,
  },
  ...zombieAnimation,
}

export default class BucketheadZombie extends Zombie {
  animationList = new AnimatedSpritesList(
    this.transform,
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
      importSpriteSheet(
        '/sprites/zombies/buckethead-zombie/bucket-breaked.png',
        new Vector2(16),
        10
      ),
      10,
      { loop: false }
    )
  }
}
