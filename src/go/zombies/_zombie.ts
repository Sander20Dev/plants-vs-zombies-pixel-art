import Entity from '../../classes/game-object/entity'
import AnimatedSpritesList from '../../classes/nodes/animated-sprites-list'
import AudioPlayer from '../../classes/nodes/audio-player'
import Collision from '../../classes/nodes/collider'
import Vector2 from '../../classes/vector2'
import { GameObjectTypes } from '../../utilities/enums'
import Time from '../../utilities/importants/time'
import Plant from '../plants/plant'
import Headless, { Fired } from './animations/headless'
import ZombieArm from './animations/zombie-arm'

export const zombieAnimation = {
  'z-normal': {
    srcs: [
      '/sprites/zombies/zombie/walking-1.png',
      '/sprites/zombies/zombie/walking-2.png',
      '/sprites/zombies/zombie/walking-3.png',
      '/sprites/zombies/zombie/walking-2.png',
    ],
    fps: 5,
  },
  'z-arm': {
    srcs: [
      '/sprites/zombies/zombie/walking-middle-1.png',
      '/sprites/zombies/zombie/walking-middle-2.png',
      '/sprites/zombies/zombie/walking-middle-3.png',
      '/sprites/zombies/zombie/walking-middle-2.png',
    ],
    fps: 5,
  },
}

export const ZOMBIE_SPEED = 4

export default class Zombie extends Entity {
  constructor(pos: Vector2, health: number, damage = 100) {
    super(GameObjectTypes.ZOMBIE, pos, health, damage)

    this.effects.onSetCold = (cold) => {
      this.#onSetCold(cold)
    }

    this.collision.onUpdate = (plant) => {
      if (plant === this.plantToEat) return
      if (plant != null) {
        if (!(plant instanceof Plant)) return
        this.plantToEat = plant
      } else {
        this.plantToEat = null
      }
    }
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

  #onSetCold(cold: boolean) {
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
    new Vector2(16, 16),
    zombieAnimation,
    'z-normal'
  )

  nodes = [this.animationList]

  #noArm = false

  setAnimation() {
    if (this.health > 90) {
      this.animationList.setCurrentAnimation('z-normal')
      return
    }

    if (!this.#noArm) {
      new ZombieArm(this.transform.add(Vector2.ZERO))
      this.#noArm = true
    }
    this.animationList.setCurrentAnimation('z-arm')
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

  #eatCounter = 0
  eatPlant() {
    if (this.plantToEat == null) {
      this.transform.x -= ZOMBIE_SPEED * Time.deltaTime
    } else {
      this.#eatCounter += Time.deltaTime
      if (this.#eatCounter >= 1) {
        this.#eatCounter -= 1
        if (Math.random() < 0.5) {
          this.#audioList.chomp.play()
        } else {
          this.#audioList.chomp2.play()
        }
        this.plantToEat.attack(100)
      }
    }
  }

  onUpdate() {
    this.eatPlant()
  }

  update(): void {
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
