import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import Zombie from './_zombie'
import AnimationObject from './animations/_animation'

const running = importSpriteSheet(
  '/sprites/zombies/football-zombie/running.png',
  new Vector2(16),
  3
)
const middleRunning = importSpriteSheet(
  '/sprites/zombies/football-zombie/middle-running.png',
  new Vector2(16),
  3
)
const armRunning = importSpriteSheet(
  '/sprites/zombies/football-zombie/arm-running.png',
  new Vector2(16),
  3
)

const footballZombieAnimation = {
  fb: {
    sprites: [...running, running[1]],
    fps: 2,
  },
  'fb-eat': {
    sprites: importSpriteSheet(
      '/sprites/zombies/football-zombie/eating.png',
      new Vector2(16),
      4
    ),
    fps: 1,
  },
  'z-normal': {
    sprites: [...middleRunning, middleRunning[1]],
    fps: 2,
  },
  'z-normal-eat': {
    sprites: importSpriteSheet(
      '/sprites/zombies/football-zombie/middle-eating.png',
      new Vector2(16),
      4
    ),
    fps: 1,
  },
  'z-arm': {
    sprites: [...armRunning, armRunning[1]],
    fps: 2,
  },
  'z-arm-eat': {
    sprites: importSpriteSheet(
      '/sprites/zombies/football-zombie/arm-eating.png',
      new Vector2(16),
      4
    ),
    fps: 1,
  },
}

export default class FootballZombie extends Zombie {
  constructor(pos: Vector2) {
    super(pos, 1581, 100)
    this.init()

    this.zombieTimeRate = 2
  }

  animationList = new AnimatedSpritesList(
    this.transform,
    footballZombieAnimation,
    'fb'
  )

  nodes = [this.animationList]

  setAnimation(): void {
    if (this.health > 181) {
      this.currentAnimation = 'fb'
      return
    }
    super.setAnimation()
  }

  onChangeAnimation(currentAnimation: string): void {
    console.log(currentAnimation)

    if (currentAnimation.includes('z-normal')) {
      new FootballHead(this.transform.add(Vector2.ZERO))
    }
    if (this.hasArm && currentAnimation.includes('z-arm')) {
      this.hasArm = false
      new FootballArm(this.transform.add(Vector2.ZERO))
    }
  }
}

const footballHead = importSpriteSheet(
  '/sprites/zombies/football-zombie/football-head.png',
  new Vector2(16),
  10
)
class FootballHead extends AnimationObject {
  constructor(pos: Vector2) {
    super(pos, footballHead, 10, { loop: false })
  }
}

const footballArm = importSpriteSheet(
  '/sprites/zombies/arm/football-arm-falling.png',
  new Vector2(16),
  10
)
class FootballArm extends AnimationObject {
  constructor(pos: Vector2) {
    super(pos, footballArm, 10, { loop: false })
  }
}
