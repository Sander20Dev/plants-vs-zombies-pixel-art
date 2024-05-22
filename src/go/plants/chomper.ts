import AnimatedSpritesList from '../../classes/nodes/animated-sprites-list'
import Collision from '../../classes/nodes/collider'
import Vector2 from '../../classes/vector2'
import { getCollide } from '../../utilities/collide'
import { Counter } from '../../utilities/delta'
import { GameObjectTypes } from '../../utilities/enums'
import { PLANTS } from '../../utilities/enums/plants'
import Zombie from '../zombies/_zombie'
import Plant from './plant'

const chomperAnimation = {
  idle: {
    srcs: [
      '/sprites/plants/chomper/idle-1.png',
      '/sprites/plants/chomper/idle-2.png',
      '/sprites/plants/chomper/idle-3.png',
      '/sprites/plants/chomper/idle-2.png',
    ],
    fps: 4,
  },
  'prepare-to-eat': {
    srcs: [
      '/sprites/plants/chomper/prepare-to-eat-1.png',
      '/sprites/plants/chomper/prepare-to-eat-2.png',
      '/sprites/plants/chomper/prepare-to-eat-3.png',
      '/sprites/plants/chomper/prepare-to-eat-4.png',
      '/sprites/plants/chomper/prepare-to-eat-5.png',
      '/sprites/plants/chomper/prepare-to-eat-6.png',
      '/sprites/plants/chomper/prepare-to-eat-7.png',
      '/sprites/plants/chomper/prepare-to-eat-8.png',
      '/sprites/plants/chomper/prepare-to-eat-9.png',
      '/sprites/plants/chomper/prepare-to-eat-10.png',
      '/sprites/plants/chomper/prepare-to-eat-11.png',
    ],
    fps: 5,
    loop: false,
  },
  'init-eat': {
    srcs: [
      '/sprites/plants/chomper/init-eat-1.png',
      '/sprites/plants/chomper/init-eat-2.png',
      '/sprites/plants/chomper/init-eat-3.png',
      '/sprites/plants/chomper/init-eat-4.png',
      '/sprites/plants/chomper/init-eat-5.png',
      '/sprites/plants/chomper/init-eat-6.png',
      '/sprites/plants/chomper/init-eat-7.png',
      '/sprites/plants/chomper/init-eat-8.png',
      '/sprites/plants/chomper/init-eat-9.png',
      '/sprites/plants/chomper/init-eat-10.png',
      '/sprites/plants/chomper/init-eat-11.png',
    ],
    fps: 5,
    loop: false,
  },
  'idle-eat': {
    srcs: [
      '/sprites/plants/chomper/idle-eat-1.png',
      '/sprites/plants/chomper/idle-eat-2.png',
      '/sprites/plants/chomper/idle-eat-3.png',
      '/sprites/plants/chomper/idle-eat-2.png',
    ],
    fps: 4,
  },
  recharge: {
    srcs: [
      '/sprites/plants/chomper/recharge-1.png',
      '/sprites/plants/chomper/recharge-2.png',
      '/sprites/plants/chomper/recharge-3.png',
      '/sprites/plants/chomper/recharge-4.png',
      '/sprites/plants/chomper/recharge-5.png',
      '/sprites/plants/chomper/recharge-6.png',
      '/sprites/plants/chomper/recharge-7.png',
      '/sprites/plants/chomper/recharge-8.png',
    ],
    fps: 4,
    loop: false,
  },
}

export default class Chomper extends Plant {
  animationList = new AnimatedSpritesList(
    this.transform,
    new Vector2(16, 16),
    chomperAnimation,
    'idle'
  )

  collision: Collision = new Collision(
    this,
    new Vector2(9, 5),
    new Vector2(4, 7),
    GameObjectTypes.ZOMBIE
  )

  detectEatZone = {
    from: new Vector2(12, 0),
    to: new Vector2(28, 16),
  }

  nodes = [this.animationList]

  constructor(pos: Vector2) {
    super(pos, PLANTS.CHOMPER)

    this.animationList.animations.idle.play()
  }

  #canEat = true
  #counter = new Counter(42, () => this.endToEat())

  endToEat() {
    this.animationList.setCurrentAnimation('recharge', true)
    this.animationList.animations.recharge.onEnd = () => {
      this.animationList.setCurrentAnimation('idle', true)
      this.#canEat = true
    }
  }

  eatZombie(zombie: Zombie) {
    this.#canEat = false
    this.animationList.setCurrentAnimation('prepare-to-eat', true)
    this.animationList.animations['prepare-to-eat'].onEnd = () => {
      this.animationList.setCurrentAnimation('init-eat', true)
      zombie.attack(this.damage, 'no-body')
    }
    this.animationList.animations['init-eat'].onEnd = () => {
      this.animationList.setCurrentAnimation('idle-eat', true)
      this.#counter.restart()
    }
  }

  detectZombie() {
    const zombies = getCollide(
      this.transform.x + this.detectEatZone.from.x,
      this.transform.y,
      this.detectEatZone.to.x,
      this.detectEatZone.to.y,
      GameObjectTypes.ZOMBIE
    ).filter((n) => n instanceof Zombie) as Zombie[]

    if (zombies.length > 0) {
      if (zombies.length < 2) {
        this.eatZombie(zombies[0])
      } else {
        zombies.sort((a, b) => b.transform.x - a.transform.x)
        this.eatZombie(zombies[0])
      }
    }
  }

  update() {
    if (this.#canEat) this.detectZombie()

    this.#counter.updater()
  }
}
