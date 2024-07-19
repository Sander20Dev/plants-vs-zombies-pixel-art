import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import Zombie from './_zombie'
import AnimationObject from './animations/_animation'

const walking = importSpriteSheet(
  '/sprites/zombies/newspaper-zombie/walking.png',
  new Vector2(16),
  3
)
const eating = importSpriteSheet(
  '/sprites/zombies/newspaper-zombie/eating.png',
  new Vector2(16),
  2
)
const mWalking = importSpriteSheet(
  '/sprites/zombies/newspaper-zombie/middle-walking.png',
  new Vector2(16),
  3
)
const mEating = importSpriteSheet(
  '/sprites/zombies/newspaper-zombie/middle-eating.png',
  new Vector2(16),
  2
)

const noW = importSpriteSheet(
  '/sprites/zombies/newspaper-zombie/no-walking.png',
  new Vector2(16),
  3
)
const noE = importSpriteSheet(
  '/sprites/zombies/newspaper-zombie/no-eating.png',
  new Vector2(16),
  2
)

const noArmW = importSpriteSheet(
  '/sprites/zombies/newspaper-zombie/no-arm-walking.png',
  new Vector2(16),
  3
)
const noArmE = importSpriteSheet(
  '/sprites/zombies/newspaper-zombie/no-arm-eating.png',
  new Vector2(16),
  2
)

const newspaperZombieAnimation = {
  np: {
    sprites: [...walking, walking[1]],
    fps: 4,
  },
  'np-eat': {
    sprites: eating,
    fps: 1,
  },
  'middle-np': {
    sprites: [...mWalking, mWalking[1]],
    fps: 4,
  },
  'middle-np-eat': {
    sprites: mEating,
    fps: 1,
  },

  'z-normal-eat': {
    sprites: noE,
    fps: 1,
  },
  'z-normal': {
    sprites: [...noW, noW[1]],
    fps: 4,
  },
  'z-arm-eat': {
    sprites: noArmE,
    fps: 1,
  },
  'z-arm': {
    sprites: [...noArmW, noArmW[2]],
    fps: 4,
  },
}

export default class NewspaperZombie extends Zombie {
  constructor(pos: Vector2) {
    super(pos, 331, 100)
    this.init()
  }
  animationList = new AnimatedSpritesList(
    this.transform,
    newspaperZombieAnimation,
    'np'
  )

  nodes = [this.animationList]

  setAnimation(): void {
    if (this.health > 256) {
      this.currentAnimation = 'np'
      return
    }
    if (this.health > 181) {
      this.currentAnimation = 'middle-np'
      return
    }
    this.zombieTimeRate = 2
    super.setAnimation()
  }

  onChangeAnimation(currentAnimation: string): void {
    if (currentAnimation.includes('z-normal')) {
      new NewspaperBreaked(this.transform.add(Vector2.ZERO))
    }
    if (this.hasArm && currentAnimation.includes('z-arm')) {
      this.hasArm = false
      new NewspaperZombieArm(this.transform.add(Vector2.ZERO))
    }
  }
}

const newspaper = importSpriteSheet(
  '/sprites/zombies/newspaper-zombie/newpaper-breaked.png',
  new Vector2(16),
  10
)

class NewspaperBreaked extends AnimationObject {
  constructor(pos: Vector2) {
    super(pos, newspaper, 10, { loop: false })
  }
}

const newspaperZombie = importSpriteSheet(
  '/sprites/zombies/arm/newspaper-arm-falling.png',
  new Vector2(16),
  10
)

class NewspaperZombieArm extends AnimationObject {
  constructor(pos: Vector2) {
    super(pos, newspaperZombie, 10, { loop: false })
  }
}
