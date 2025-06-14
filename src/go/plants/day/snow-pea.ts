import AnimatedSprite from '../../../game-engine/nodes/animated-sprite'
import Collision from '../../../game-engine/nodes/collider'
import Sprite from '../../../game-engine/nodes/sprite'
import Vector2 from '../../../game-engine/utilities/vector2'
import { hasAZombie } from '../../../utilities/zombies'
import AudioPlayer, {
  MultipleAudioPlayer,
} from '../../../game-engine/nodes/audio-player'
import Zombie from '../../zombies/_zombie'
import { PLANTS } from '../../../utilities/enums/plants'
import Plant from '../plant'
import SpriteTexture from '../../../game-engine/utilities/sprite'
import Pea, { SHOOT_VELOCITY, PEA_DAMAGE } from '../../projectils/pea'

const sprites = [
  '/sprites/plants/day/snow-pea/idle3.png',
  '/sprites/plants/day/snow-pea/attack.png',
]

export default class SnowPea extends Plant {
  #attacking = false

  #audiosList = {
    throw: new MultipleAudioPlayer('/audios/plants/peashooter/throw.ogg'),
    throw2: new MultipleAudioPlayer('/audios/plants/peashooter/throw2.ogg'),
  }

  collision: Collision = new Collision(
    this,
    new Vector2(6, 5),
    new Vector2(5, 11)
  )
  #animation = new AnimatedSprite(
    this.transform,
    [
      new SpriteTexture('/sprites/plants/day/snow-pea/idle1.png'),
      new SpriteTexture('/sprites/plants/day/snow-pea/idle2.png'),
      new SpriteTexture('/sprites/plants/day/snow-pea/idle1.png'),
      new SpriteTexture('/sprites/plants/day/snow-pea/idle3.png'),
      // '/sprites/plants/day/snow-pea/attack.png',
    ],
    4 / SHOOT_VELOCITY
  )

  nodes = [this.#animation]

  constructor(pos: Vector2, zIndex?: number) {
    super(pos, PLANTS.SNOW_PEA, zIndex)

    this.#animation.onChange = (index) => {
      if (this.#attacking && index === 3) {
        this.#generateAPea()
      }
    }
  }

  #generateAPea() {
    if (Math.random() < 0.5) {
      this.#audiosList.throw.play()
    } else {
      this.#audiosList.throw2.play()
    }
    new SnowPeaProjectil(
      new Vector2(this.transform.x + 10, this.transform.y + 8)
    )
  }

  update(): void {
    this.#attacking = hasAZombie(
      this.transform.x + 9,
      this.transform.y + 4,
      Vector2.SCREEN.x - this.transform.x - 9,
      8
    )
    this.#animation.changeAnAnimation(3, sprites[this.#attacking ? 1 : 0])
  }
}

class SnowPeaProjectil extends Pea {
  #audioList = {
    splat: new AudioPlayer('/audios/plants/pea/splat.ogg'),
    splat2: new AudioPlayer('/audios/plants/pea/splat2.ogg'),
    splat3: new AudioPlayer('/audios/plants/pea/splat3.ogg'),
  }

  nodes = [
    new Sprite('/sprites/projectiles/snow-pea.png', this.transform, {
      rawCoords: true,
    }),
  ]

  constructor(pos: Vector2) {
    super(pos)

    this.collision.onCollision = (zombie) => {
      if (zombie instanceof Zombie) {
        const random = Math.random()

        if (random < 0.33) {
          this.#audioList.splat.play()
        } else if (random < 0.67) {
          this.#audioList.splat2.play()
        } else {
          this.#audioList.splat3.play()
        }

        zombie.attack(PEA_DAMAGE)
        zombie.effects.setCold(true)
        this.destroy()
      }
    }
  }
}
