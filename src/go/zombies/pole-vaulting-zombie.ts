import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import Vector2 from '../../game-engine/utilities/vector2'
import { getCollide } from '../../utilities/collide'
import { GameObjectTypes } from '../../utilities/enums'
import Time from '../../game-engine/utilities/time'
import Plant from '../plants/plant'
import Zombie, { ZOMBIE_SPEED } from './_zombie'
import AnimationObject from './animations/_animation'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'

const [onAir1, onAir2, ...onAir] = importSpriteSheet(
  '/sprites/zombies/pole-vaulting-zombie/on-air.png',
  new Vector2(16),
  10
)

const [running1, running2, running3] = importSpriteSheet(
  '/sprites/zombies/pole-vaulting-zombie/running.png',
  new Vector2(16),
  3
)

const [walking1, walking2, walking3] = importSpriteSheet(
  '/sprites/zombies/pole-vaulting-zombie/walking.png',
  new Vector2(16),
  3
)

const [eat1, eat2, eat3] = importSpriteSheet(
  '/sprites/zombies/pole-vaulting-zombie/eat.png',
  new Vector2(16),
  3
)

const [middle1, middle2, middle3] = importSpriteSheet(
  '/sprites/zombies/pole-vaulting-zombie/middle.png',
  new Vector2(16),
  3
)

const poleVaultingZombieAnimation = {
  running: {
    sprites: [running1, running2, running1, running3],
    fps: 8,
  },
  jumping: {
    sprites: importSpriteSheet(
      '/sprites/zombies/pole-vaulting-zombie/jumping.png',
      new Vector2(16),
      6
    ),
    fps: 9,
    loop: false,
  },
  fall: {
    sprites: [
      onAir1,
      onAir2,
      ...importSpriteSheet(
        '/sprites/zombies/pole-vaulting-zombie/fall.png',
        new Vector2(16),
        6
      ),
    ],
    fps: 1,
  },
  onAir: {
    sprites: [onAir1, onAir2, ...onAir],
    fps: 5,
    loop: false,
  },
  walking: {
    sprites: [walking1, walking2, walking1, walking3],
    fps: 4,
  },
  'walking-eat': {
    sprites: [eat1, eat2, eat1, eat3],
    fps: 2,
  },
  middle: {
    sprites: [middle1, middle2, middle1, middle3],
    fps: 4,
  },
  'middle-eat': {
    sprites: importSpriteSheet(
      '/sprites/zombies/pole-vaulting-zombie/eat-middle.png',
      new Vector2(16),
      2
    ),
    fps: 1,
  },
}

export default class PoleVaultingZombie extends Zombie {
  velocity: 'very-fast' | 'fast' | 'no' | 'normal' = 'fast'
  skip = false
  jumped = false
  isLarge = false

  constructor(pos: Vector2) {
    super(pos, 335)

    this.noEat = true

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
      this.#normalize()
    }
    this.animationList.animations.onAir.onChange = (index) => {
      if (index === 2) {
        new Stick(new Vector2(this.transform.x + 4, this.transform.y + 0))
      }
    }
    this.animationList.animations.onAir.onEnd = () => this.#normalize()

    this.init()
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

  setAnimation(): void {
    if (this.health <= 90) {
      if (this.currentAnimation === 'walking') {
        this.currentAnimation = 'middle'
      }
    }
  }

  onChangeAnimation(currentAnimation: string): void {
    if (this.hasArm && currentAnimation.includes('middle')) {
      this.hasArm = false
      new PoleVaultingArm(this.transform.add(Vector2.ZERO))
    }
  }

  #normalize() {
    this.animationList.setCurrentAnimation('walking')
    this.animationList.animations.walking.play()
    this.collision.invulnerable = false
    this.velocity = 'normal'
    this.skip = false
    this.jumped = true
    this.currentAnimation = 'walking'
    this.noEat = false
  }

  animationList = new AnimatedSpritesList(
    this.transform,
    poleVaultingZombieAnimation,
    'running'
  )

  nodes: AnimatedSpritesList[] = [this.animationList]

  update() {
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
    }
    super.update()
  }
}

class Stick extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      importSpriteSheet(
        '/sprites/zombies/pole-vaulting-zombie/stick.png',
        new Vector2(16),
        10
      ),
      10,
      { loop: false }
    )
  }
}
class PoleVaultingArm extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      importSpriteSheet(
        '/sprites/zombies/arm/pole-vaulting-arm-falling.png',
        new Vector2(16),
        10
      ),
      10,
      { loop: false }
    )
  }
}
