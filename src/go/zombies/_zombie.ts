import Entity from '../../_mods-ge/entity'
import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import AudioPlayer from '../../game-engine/nodes/audio-player'
import Collision from '../../game-engine/nodes/collider'
import Vector2 from '../../game-engine/utilities/vector2'
import { GameObjectTypes } from '../../utilities/enums'
import Time from '../../game-engine/utilities/time'
import Plant from '../plants/plant'
import Headless, { Fired } from './animations/headless'
import ZombieArm from './animations/zombie-arm'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import { Counter } from '../../utilities/delta'

const [eat1, eat2, eat3] = importSpriteSheet(
  '/sprites/zombies/zombie/eat.png',
  new Vector2(16),
  3
)
const [walking1, walking2, walking3] = importSpriteSheet(
  '/sprites/zombies/zombie/walking.png',
  new Vector2(16),
  3
)
const [walkingMiddle1, walkingMiddle2, walkingMiddle3] = importSpriteSheet(
  '/sprites/zombies/zombie/walking-middle.png',
  new Vector2(16),
  3
)

export const zombieAnimation = {
  'z-normal-eat': {
    sprites: [eat1, eat2, eat1, eat3],
    fps: 4,
  },
  'z-normal': {
    sprites: [walking1, walking2, walking3, walking2],
    fps: 5,
  },
  'z-arm-eat': {
    sprites: importSpriteSheet(
      '/sprites/zombies/zombie/eat-middle.png',
      new Vector2(16),
      2
    ),
    fps: 8,
  },
  'z-arm': {
    sprites: [walkingMiddle1, walkingMiddle2, walkingMiddle3, walkingMiddle2],
    fps: 5,
  },
}

export const ZOMBIE_SPEED = 3.5

export default class Zombie extends Entity {
  noEat = false

  init() {
    this.animationList.onChangeAnimation = (c) => this.onChangeAnimation(c)
  }

  currentAnimation = 'z-normal'

  constructor(pos: Vector2, health: number, damage = 100) {
    super(GameObjectTypes.ZOMBIE, pos, health, damage)

    this.effects.onSetCold = (cold) => {
      this.#onSetCold(cold)
    }

    this.collision.onUpdate = (plant) => {
      if (this.noEat) return

      if (plant instanceof Plant) {
        this.eatPlant(plant)
      } else {
        this.animationList.setCurrentAnimation(this.currentAnimation, true)
        this.transform.x -= ZOMBIE_SPEED * Time.deltaTime
      }
    }
    this.init()
  }

  #audioList = {
    chomp: new AudioPlayer('/audios/zombies/chomp.ogg'),
    chomp2: new AudioPlayer('/audios/zombies/chomp2.ogg'),
    groan: new AudioPlayer('/audios/zombies/groan.ogg'),
    groan2: new AudioPlayer('/audios/zombies/groan2.ogg'),
    groan3: new AudioPlayer('/audios/zombies/groan3.ogg'),
    groan4: new AudioPlayer('/audios/zombies/groan4.ogg'),
    groan5: new AudioPlayer('/audios/zombies/groan5.ogg'),
    groan6: new AudioPlayer('/audios/zombies/groan6.ogg'),
  }

  effects = new Effects(5, 5)

  #attackedCounter = new Counter(0.1, () => {
    this.animationList.filters = 'none'
  })

  #onSetCold(cold: boolean) {
    this.localTimeRate = cold ? 0.5 : 1
    this.animationList.filters = cold
      ? 'sepia(1) hue-rotate(190deg) saturate(0.5)'
      : 'none'
  }

  collision: Collision = new Collision(
    this,
    new Vector2(5, 3),
    new Vector2(5, 13),
    GameObjectTypes.PLANT
  )

  animationList = new AnimatedSpritesList(
    this.transform,
    zombieAnimation,
    'z-normal'
  )

  nodes = [this.animationList]

  setAnimation() {
    if (this.health > 90) {
      this.currentAnimation = 'z-normal'
      return
    }

    this.currentAnimation = 'z-arm'
  }

  hasArm = true
  onChangeAnimation(currentAnimation: string) {
    if (this.hasArm && currentAnimation.includes('z-arm')) {
      this.hasArm = false
      new ZombieArm(this.transform.add(Vector2.ZERO))
    }
  }

  zombieGroan() {
    this.#groanCounter += Time.deltaTime
    if (this.#groanCounter >= 2) {
      this.#groanCounter -= 2
      if (Math.random() < 0.12) {
        const random = Math.random()
        if (random < 0.17) {
          this.#audioList.groan.play()
        } else if (random < 0.33) {
          this.#audioList.groan2.play()
        } else if (random < 0.5) {
          this.#audioList.groan3.play()
        } else if (random < 0.66) {
          this.#audioList.groan4.play()
        } else if (random < 0.83) {
          this.#audioList.groan5.play()
        } else {
          this.#audioList.groan6.play()
        }
      }
    }
  }

  plantToEat: Plant | null = null
  #groanCounter = 0

  #update(): void {
    this.zombieGroan()
    this.setAnimation()
  }

  eatPlant(plant: Plant) {
    this.animationList.animations[this.currentAnimation + '-eat'].onChange = (
      i
    ) => {
      if (i === 1 || i === 3) return
      if (Math.random() < 0.5) {
        this.#audioList.chomp.play()
      } else {
        this.#audioList.chomp2.play()
      }
      plant.attack(50)
    }
    this.animationList.setCurrentAnimation(this.currentAnimation + '-eat', true)
  }

  onUpdate() {
    // this.eatPlant()
  }

  update(): void {
    this.#attackedCounter.updater()

    this.effects.update(() => {
      this.#update()
      this.onUpdate()
    })
  }
  nodesUpdate(nodeUpdate: () => void): void {
    this.effects.nodeUpdate(nodeUpdate)
  }

  attack(damage: number, reason?: 'fire' | 'no-body'): void {
    if (damage > this.health) {
      if (reason === 'fire') {
        new Fired(this.transform)
      } else if (reason == null) {
        new Headless(this.transform)
      }
    } else {
      this.animationList.filters = 'brightness(150%)'

      this.#attackedCounter.restart()
      this.#attackedCounter.play()
    }

    super.attack(damage)
  }
}

export class Effects {
  isCold = false
  isIce = false

  constructor(public coldTime: number, public iceTime: number) {}

  setCold(cold: boolean) {
    this.isCold = cold
    this.#counterCold = 0
    this.onSetCold(cold)
  }

  onSetCold(_cold: boolean) {}

  #counterCold = 0
  #coldTime() {
    if (this.isCold) {
      this.#counterCold += Time.deltaTime
      if (this.#counterCold >= this.coldTime) {
        this.setCold(false)
      }
    } else {
      this.#counterCold = 0
    }
  }

  update(cb: (tr: number) => void) {
    this.#coldTime()

    if (this.isIce) {
      cb(0)
      return
    }
    if (this.isCold) {
      cb(0.5)
      return
    }

    cb(1)
  }
  nodeUpdate(nodeUpdate: (tr: number) => void) {
    if (this.isIce) {
      nodeUpdate(0)
      return
    }
    if (this.isCold) {
      nodeUpdate(0.5)
      return
    }
    nodeUpdate(1)
  }
}
