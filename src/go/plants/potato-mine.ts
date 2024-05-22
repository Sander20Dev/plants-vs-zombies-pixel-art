import AnimatedSpritesList from '../../classes/nodes/animated-sprites-list'
import AudioPlayer from '../../classes/nodes/audio-player'
import Collision from '../../classes/nodes/collider'
import Vector2 from '../../classes/vector2'
import { getCollide } from '../../utilities/collide'
import { GameObjectTypes } from '../../utilities/enums'
import { PLANTS } from '../../utilities/enums/plants'
import Time from '../../utilities/importants/time'
import { hasAZombie } from '../../utilities/zombies'
import Zombie from '../zombies/_zombie'
import AnimationObject from '../zombies/animations/_animation'
import Plant from './plant'

const potatoMineAnimation = {
  desactivate: {
    srcs: [
      '/sprites/plants/potato-mine/desactivate-1.png',
      '/sprites/plants/potato-mine/desactivate-2.png',
    ],
    fps: 1,
  },
  leave: {
    srcs: [
      '/sprites/plants/potato-mine/leave-1.png',
      '/sprites/plants/potato-mine/leave-2.png',
      '/sprites/plants/potato-mine/leave-3.png',
      '/sprites/plants/potato-mine/leave-4.png',
      '/sprites/plants/potato-mine/leave-5.png',
    ],
    fps: 5,
    loop: false,
  },
  semiActivate: {
    srcs: [
      '/sprites/plants/potato-mine/leave-5.png',
      '/sprites/plants/potato-mine/semiactivate-2.png',
    ],
    fps: 1,
  },
  activate: {
    srcs: [
      '/sprites/plants/potato-mine/activate-1.png',
      '/sprites/plants/potato-mine/activate-2.png',
    ],
    fps: 1,
  },
}

export default class PotatoMine extends Plant {
  audiosList = {
    potatoMine: new AudioPlayer('/audios/plants/potato-mine/potato_mine.ogg'),
  }

  collision: Collision = new Collision(
    this,
    new Vector2(6, 12),
    new Vector2(5, 4)
  )

  animationList = new AnimatedSpritesList(
    this.transform,
    new Vector2(16, 16),
    potatoMineAnimation,
    'desactivate'
  )

  nodes = [this.animationList]

  constructor(pos: Vector2) {
    super(pos, PLANTS.POTATO_MINE)
    this.animationList.animations.desactivate.play()

    this.animationList.animations.leave.onEnd = () => {
      this.animationList.setCurrentAnimation('semiActivate', true)
    }
  }

  #counter = 0
  #leaved = false
  #activated = false

  update(): void {
    if (this.#counter < 12) {
      this.#counter += Time.deltaTime
    }

    if (this.#counter >= 12 && !this.#activated) {
      this.animationList.setCurrentAnimation('activate', true)
      this.#activated = true
    } else if (this.#counter >= 8 && !this.#leaved) {
      this.animationList.setCurrentAnimation('leave', true)
      this.#leaved = true
    }

    if (this.#activated) {
      if (hasAZombie(this.transform.x + 5, this.transform.y + 11, 7, 5)) {
        const zombies = getCollide(
          this.transform.x,
          this.transform.y,
          16,
          16,
          GameObjectTypes.ZOMBIE
        )

        for (const zombie of zombies) {
          if (!(zombie instanceof Zombie)) continue
          zombie.attack(this.damage, 'fire')
        }

        new Kapown(this.transform)
        this.destroy()
      }
    }
  }

  destroy(): void {
    this.audiosList.potatoMine.play()
    super.destroy()
  }
}

class Kapown extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      [
        '/sprites/plants/potato-mine/spudow-1.png',
        '/sprites/plants/potato-mine/spudow-2.png',
        '/sprites/plants/potato-mine/spudow-3.png',
        '/sprites/plants/potato-mine/spudow-4.png',
        '/sprites/plants/potato-mine/spudow-5.png',
        '/sprites/plants/potato-mine/spudow-6.png',
        '/sprites/plants/potato-mine/spudow-7.png',
        '/sprites/plants/potato-mine/spudow-8.png',
        '/sprites/plants/potato-mine/spudow-9.png',
        '/sprites/plants/potato-mine/spudow-10.png',
      ],
      10,
      new Vector2(16, 16),
      { loop: false }
    )
  }
}
