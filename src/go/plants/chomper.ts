import AnimatedSpritesList from '../../classes/nodes/animated-sprites-list'
import Collision from '../../classes/nodes/collider'
import Vector2 from '../../classes/vector2'
import { getCollide } from '../../utilities/collide'
import { Counter } from '../../utilities/delta'
import { GameObjectTypes } from '../../utilities/enums'
import { PLANTS } from '../../utilities/enums/plants'
import Zombie from '../zombies/_zombie'
import Plant from './plant'

const collidePerIndex = [
  { rel: new Vector2(6, 2), size: new Vector2(8, 10) },
  { rel: new Vector2(4, 1), size: new Vector2(11, 7) },
  { rel: new Vector2(3, 1), size: new Vector2(9, 8) },
  { rel: new Vector2(7, 1), size: new Vector2(7, 9) },
  { rel: new Vector2(9, 2), size: new Vector2(7, 9) },
  { rel: new Vector2(11, 2), size: new Vector2(7, 9) },
  { rel: new Vector2(14, 0), size: new Vector2(7, 9) },
  { rel: new Vector2(18, 0), size: new Vector2(7, 9) },
  { rel: new Vector2(23, 2), size: new Vector2(7, 9) },
]

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
    rel: new Vector2(8, 0),
    size: new Vector2(24, 16),
  }

  nodes = [this.animationList]

  constructor(pos: Vector2) {
    super(pos, PLANTS.CHOMPER)

    this.animationList.animations.idle.play()
  }

  #canEat = true
  #counter = new Counter(42, () => this.endToEat())
  #detectedZombie: Zombie | null = null

  endToEat() {
    this.animationList.setCurrentAnimation('recharge', true)
    this.animationList.animations.recharge.onEnd = () => {
      this.animationList.setCurrentAnimation('idle', true)
      this.#canEat = true
    }
  }

  eatZombie() {
    if (this.#detectedZombie == null) return
    this.#canEat = false
    this.animationList.setCurrentAnimation('prepare-to-eat', true)

    this.animationList.animations['prepare-to-eat'].onChange = (index) => {
      if (this.#detectedZombie == null) return

      if (
        !this.#detectedZombie.collision.detectCollision(
          this.transform.add(collidePerIndex[index].rel),
          this.transform
            .add(collidePerIndex[index].rel)
            .add(collidePerIndex[index].size)
        )
      )
        return

      this.animationList.setCurrentAnimation('init-eat', true, {
        animationIndex: 8 - index,
      })
      this.#detectedZombie.attack(this.damage, 'no-body')
    }

    this.animationList.animations['prepare-to-eat'].onEnd = () => {
      if (this.#detectedZombie == null) return

      this.animationList.setCurrentAnimation('init-eat', true)
      this.#detectedZombie.attack(this.damage, 'no-body')
    }
    this.animationList.animations['init-eat'].onEnd = () => {
      this.animationList.setCurrentAnimation('idle-eat', true)
      this.#counter.restart()
    }
  }

  detectZombie() {
    const zombies = getCollide(
      this.transform.x + this.detectEatZone.rel.x,
      this.transform.y,
      this.detectEatZone.size.x,
      this.detectEatZone.size.y,
      GameObjectTypes.ZOMBIE
    ).filter((n) => n instanceof Zombie) as Zombie[]

    if (zombies.length > 0) {
      if (zombies.length < 2) {
        this.#detectedZombie = zombies[0]
        this.eatZombie()
      } else {
        zombies.sort((a, b) => b.transform.x - a.transform.x)
        this.#detectedZombie = zombies[0]
        this.eatZombie()
      }
    }
  }

  update() {
    if (this.#canEat) this.detectZombie()

    this.#counter.updater()
  }
}
