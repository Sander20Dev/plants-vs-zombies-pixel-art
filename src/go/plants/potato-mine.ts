import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import AudioPlayer from '../../game-engine/nodes/audio-player'
import Collision from '../../game-engine/nodes/collider'
import Vector2 from '../../game-engine/utilities/vector2'
import { getCollide } from '../../utilities/collide'
import { GameObjectTypes } from '../../utilities/enums'
import { PLANTS } from '../../utilities/enums/plants'
import Time from '../../game-engine/utilities/time'
import { hasAZombie } from '../../utilities/zombies'
import Zombie from '../zombies/_zombie'
import AnimationObject from '../zombies/animations/_animation'
import Plant from './plant'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'

const potatoMineAnimation = {
  desactivate: {
    sprites: importSpriteSheet(
      '/sprites/plants/potato-mine/desactivate.png',
      new Vector2(16),
      2
    ),
    fps: 1,
  },
  leave: {
    sprites: importSpriteSheet(
      '/sprites/plants/potato-mine/leave.png',
      new Vector2(16),
      5
    ),
    fps: 5,
    loop: false,
  },
  activate: {
    sprites: importSpriteSheet(
      '/sprites/plants/potato-mine/activate.png',
      new Vector2(16),
      2
    ),
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
    potatoMineAnimation,
    'desactivate'
  )

  nodes = [this.animationList]

  constructor(pos: Vector2) {
    super(pos, PLANTS.POTATO_MINE)
    this.animationList.animations.desactivate.play()

    this.animationList.animations.leave.onEnd = () => {
      this.animationList.setCurrentAnimation('activate', true)
    }
  }

  #counter = 0
  #activated = false

  update(): void {
    if (this.#counter < 12) {
      this.#counter += Time.deltaTime
    }

    if (this.#counter >= 12 && !this.#activated) {
      this.animationList.setCurrentAnimation('leave', true)
      this.#activated = true
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
      importSpriteSheet(
        '/sprites/plants/potato-mine/spudow.png',
        new Vector2(16),
        10
      ),
      10,
      { loop: false }
    )
  }
}
