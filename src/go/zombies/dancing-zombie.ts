import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import Time from '../../game-engine/utilities/time'
import Vector2 from '../../game-engine/utilities/vector2'
import Plant from '../plants/plant'
import Zombie, { ZOMBIE_SPEED } from './_zombie'

const startingDance = importSpriteSheet(
  '/sprites/zombies/dancing-zombie/starting-dance.png',
  new Vector2(16),
  8
)

const dancingZombieAnimation = {
  'start-dance': {
    sprites: startingDance.concat(startingDance, startingDance),
    fps: 8,
    loop: false,
  },
  reverse: {
    sprites: importSpriteSheet(
      '/sprites/zombies/dancing-zombie/reverse.png',
      new Vector2(16),
      6
    ),
    fps: 8,
    loop: false,
  },
  dancing: {
    sprites: importSpriteSheet(
      '/sprites/zombies/dancing-zombie/dancing.png',
      new Vector2(16),
      12
    ),
    fps: 10,
  },
}

export default class DancingZombie extends Zombie {
  animationList = new AnimatedSpritesList(
    this.transform,
    dancingZombieAnimation,
    'start-dance'
  )

  currentAnimation: string = 'start-dance'

  nodes: AnimatedSpritesList[] = [this.animationList]

  constructor(pos: Vector2) {
    super(pos, 335, 100)
    this.init()

    this.animationList.animations['start-dance'].play()

    this.animationList.animations['start-dance'].onEnd = () => {
      this.animationList.setCurrentAnimation('reverse', true)
    }
    this.animationList.animations.reverse.onEnd = () => {
      this.animationList.setCurrentAnimation('dancing', true)
    }
    this.animationList.animations.dancing.onEnd = () => {
      this.animationList.setCurrentAnimation('walking', true)
    }
    this.animationList.animations.walking.onEnd = () => {
      this.animationList.setCurrentAnimation('dancing', true)
    }

    this.collision.onUpdate = (plant) => {
      if (!this.animationList.currentAnimationName.includes('walking')) return
      if (plant instanceof Plant) {
        if (
          this.animationList.currentAnimationName.includes('middle-walking')
        ) {
          this.animationList.setCurrentAnimation('middle-walking-eat')
        } else {
          this.animationList.setCurrentAnimation('walking-eat')
        }
        this.eatPlant(plant)
      } else {
        if (
          this.animationList.currentAnimationName.includes('middle-walking')
        ) {
          this.animationList.setCurrentAnimation('middle-walking')
        } else {
          this.animationList.setCurrentAnimation('walking')
        }
      }
    }
  }

  setAnimation(): void {}

  update(): void {
    if (this.animationList.currentAnimationName === 'start-dance') {
      this.transform.x -= ZOMBIE_SPEED * 3 * Time.deltaTime
    }
    if (this.animationList.currentAnimationName === 'reverse') {
      this.transform.x -= ZOMBIE_SPEED * 3 * Time.deltaTime
    }
  }
}
