import { GameObject } from '../../classes/game-object'
import AnimatedSpritesList from '../../classes/nodes/animated-sprites-list'
import Vector2 from '../../classes/vector2'
import { getCollide } from '../../utilities/collide'
import { GameObjectTypes } from '../../utilities/enums'
import Time from '../../utilities/importants/time'
import Plant from '../plants/plant'
import Zombie, { ZOMBIE_SPEED } from './_zombie'
import AnimationObject from './animations/_animation'

const poleVaultingZombieAnimation = {
  running: {
    srcs: [
      '/sprites/zombies/pole-vaulting-zombie/running-1.png',
      '/sprites/zombies/pole-vaulting-zombie/running-2.png',
      '/sprites/zombies/pole-vaulting-zombie/running-1.png',
      '/sprites/zombies/pole-vaulting-zombie/running-3.png',
    ],
    fps: 8,
  },
  jumping: {
    srcs: [
      '/sprites/zombies/pole-vaulting-zombie/jumping-1.png',
      '/sprites/zombies/pole-vaulting-zombie/jumping-2.png',
      '/sprites/zombies/pole-vaulting-zombie/jumping-3.png',
      '/sprites/zombies/pole-vaulting-zombie/jumping-4.png',
      '/sprites/zombies/pole-vaulting-zombie/jumping-5.png',
      '/sprites/zombies/pole-vaulting-zombie/jumping-6.png',
    ],
    fps: 9,
    loop: false,
  },
  fall: {
    srcs: [
      '/sprites/zombies/pole-vaulting-zombie/on-air-1.png',
      '/sprites/zombies/pole-vaulting-zombie/on-air-2.png',
      '/sprites/zombies/pole-vaulting-zombie/fall-1.png',
      '/sprites/zombies/pole-vaulting-zombie/fall-2.png',
      '/sprites/zombies/pole-vaulting-zombie/fall-3.png',
      '/sprites/zombies/pole-vaulting-zombie/fall-4.png',
      '/sprites/zombies/pole-vaulting-zombie/fall-5.png',
      '/sprites/zombies/pole-vaulting-zombie/fall-6.png',
    ],
    fps: 1,
  },
  onAir: {
    srcs: [
      '/sprites/zombies/pole-vaulting-zombie/on-air-1.png',
      '/sprites/zombies/pole-vaulting-zombie/on-air-2.png',
      '/sprites/zombies/pole-vaulting-zombie/on-air-3.png',
      '/sprites/zombies/pole-vaulting-zombie/on-air-4.png',
      '/sprites/zombies/pole-vaulting-zombie/on-air-5.png',
      '/sprites/zombies/pole-vaulting-zombie/on-air-6.png',
      '/sprites/zombies/pole-vaulting-zombie/on-air-7.png',
      '/sprites/zombies/pole-vaulting-zombie/on-air-8.png',
      '/sprites/zombies/pole-vaulting-zombie/on-air-9.png',
      '/sprites/zombies/pole-vaulting-zombie/on-air-10.png',
    ],
    fps: 5,
    loop: false,
  },
  walking: {
    srcs: [
      '/sprites/zombies/pole-vaulting-zombie/walking-1.png',
      '/sprites/zombies/pole-vaulting-zombie/walking-2.png',
      '/sprites/zombies/pole-vaulting-zombie/walking-1.png',
      '/sprites/zombies/pole-vaulting-zombie/walking-3.png',
    ],
    fps: 4,
  },
  eat: {
    srcs: [
      '/sprites/zombies/pole-vaulting-zombie/eat-1.png',
      '/sprites/zombies/pole-vaulting-zombie/eat-2.png',
      '/sprites/zombies/pole-vaulting-zombie/eat-1.png',
      '/sprites/zombies/pole-vaulting-zombie/eat-3.png',
    ],
    fps: 4,
  },
}

export default class PoleVaultingZombie extends Zombie {
  velocity: 'very-fast' | 'fast' | 'no' | 'normal' = 'fast'
  skip = false
  jumped = false
  isLarge = false

  constructor(pos: Vector2) {
    super(pos, 335)

    const onUpdate = this.collision.onUpdate

    this.collision.onUpdate = () => {}

    this.animationList.currentAnimation.play()
    this.animationList.animations.jumping.onEnd = () => {
      if (this.isLarge) {
        this.animationList.setCurrentAnimation('onAir', true)
        this.velocity = 'very-fast'
        this.collision.invulnerable = true
      } else {
        this.animationList.setCurrentAnimation('fall', true)
        this.velocity = 'no'
      }
    }
    this.animationList.animations.fall.onChange = (index) => {
      if (index === 1) {
        new Stick(new Vector2(this.transform.x + 3, this.transform.y + 0))
      }
    }
    this.animationList.animations.fall.onEnd = () => {
      this.#normalize(onUpdate)
    }
    this.animationList.animations.onAir.onChange = (index) => {
      if (index === 2) {
        new Stick(new Vector2(this.transform.x + 4, this.transform.y + 0))
      }
    }
    this.animationList.animations.onAir.onEnd = () => this.#normalize(onUpdate)
  }

  detectCollision() {
    if (this.skip) return

    const plants = getCollide(
      this.transform.x - ((this.transform.x - 40) % 16),
      this.transform.y,
      16,
      16,
      GameObjectTypes.PLANT
    ).filter((n) => n instanceof Plant) as Plant[]

    if (plants.length < 1) return

    if (!this.jumped) {
      this.velocity = 'no'
      this.animationList.setCurrentAnimation('jumping')
      this.animationList.animations.jumping.play()
      this.skip = true
      this.isLarge = true //plant.isLarge
    }
  }

  #normalize(onUpdate: (obj?: GameObject | undefined) => void) {
    this.animationList.setCurrentAnimation('walking')
    this.animationList.animations.walking.play()
    this.collision.invulnerable = false
    this.velocity = 'normal'
    this.skip = false
    this.jumped = true
    this.collision.onUpdate = (obj) => {
      if (obj instanceof Plant) {
        this.animationList.setCurrentAnimation('eat', true)
      } else {
        this.animationList.setCurrentAnimation('walking', true)
      }
      onUpdate(obj)
    }
  }

  animationList = new AnimatedSpritesList(
    this.transform,
    new Vector2(16, 16),
    poleVaultingZombieAnimation,
    'running'
  )

  nodes: AnimatedSpritesList[] = [this.animationList]

  onUpdate = () => {
    this.detectCollision()
    if (!this.jumped) {
      if (this.velocity === 'very-fast') {
        this.transform.x -= ZOMBIE_SPEED * 4 * Time.deltaTime
      } else if (this.velocity === 'fast') {
        this.transform.x -= ZOMBIE_SPEED * 1.8 * Time.deltaTime
      } else if (this.velocity === 'normal') {
        this.transform.x -= ZOMBIE_SPEED * Time.deltaTime
      }
    } else {
      super.onUpdate()
    }
  }
}

class Stick extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      [
        '/sprites/zombies/pole-vaulting-zombie/stick-1.png',
        '/sprites/zombies/pole-vaulting-zombie/stick-2.png',
        '/sprites/zombies/pole-vaulting-zombie/stick-3.png',
        '/sprites/zombies/pole-vaulting-zombie/stick-4.png',
        '/sprites/zombies/pole-vaulting-zombie/stick-5.png',
        '/sprites/zombies/pole-vaulting-zombie/stick-6.png',
        '/sprites/zombies/pole-vaulting-zombie/stick-7.png',
        '/sprites/zombies/pole-vaulting-zombie/stick-8.png',
        '/sprites/zombies/pole-vaulting-zombie/stick-9.png',
        '/sprites/zombies/pole-vaulting-zombie/stick-10.png',
      ],
      10,
      new Vector2(16, 16),
      { loop: false }
    )
  }
}
