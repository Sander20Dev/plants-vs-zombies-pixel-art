import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import Collision from '../../game-engine/nodes/collider'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { GameObjectTypes } from '../../utilities/enums'
import Zombie from './_zombie'
import AnimationObject from './animations/_animation'

export default class ScreenDoorZombie extends Zombie {
  door: ScreenDoor | null

  constructor(pos: Vector2) {
    super(pos, 181, 100)
    this.init()
    this.door = new ScreenDoor(pos)
    this.door.addEventListener('destroy', () => {
      this.door = null
    })
  }

  destroy(): void {
    if (this.door != null) this.door.destroy()
    super.destroy()
  }
}

const [door, breakedDoor] = importSpriteSheet(
  '/sprites/zombies/screen-door-zombie/door.png',
  new Vector2(16),
  2
)
const screenDoorAnimation = {
  'z-normal': {
    sprites: [door],
    fps: 1,
  },
  'z-normal-eat': {
    sprites: [door],
    fps: 1,
  },
  'z-arm': {
    sprites: [breakedDoor],
    fps: 1,
  },
  'z-arm-eat': {
    sprites: [breakedDoor],
    fps: 1,
  },
}

class ScreenDoor extends Zombie {
  noEat = true

  constructor(pos: Vector2) {
    super(pos, 1100)
    this.init()
  }

  animationList = new AnimatedSpritesList(
    this.transform,
    screenDoorAnimation,
    'z-normal'
  )

  nodes = [this.animationList]

  collision: Collision = new Collision(
    this,
    new Vector2(2, 8),
    new Vector2(5, 7),
    GameObjectTypes.PLANT
  )

  setAnimation(): void {
    if (this.health > 550) {
      this.currentAnimation = 'z-normal'
      return
    }

    this.currentAnimation = 'z-arm'
  }

  onChangeAnimation(currentAnimation: string): void {
    if (this.hasArm && currentAnimation.includes('z-arm')) {
      this.hasArm = false
    }
  }

  attack(damage: number) {
    return super.attack(damage, 'no-body')
  }

  update(): void {
    this.animationList.setCurrentAnimation(this.currentAnimation, true)
  }

  destroy(): void {
    new ScreenDoorBreaked(this.transform)
    super.destroy()
  }
}

const screenDoorBreaking = importSpriteSheet(
  '/sprites/zombies/screen-door-zombie/door-breaking.png',
  new Vector2(16),
  10
)
class ScreenDoorBreaked extends AnimationObject {
  constructor(pos: Vector2) {
    super(pos, screenDoorBreaking, 10, { loop: false })
  }
}
