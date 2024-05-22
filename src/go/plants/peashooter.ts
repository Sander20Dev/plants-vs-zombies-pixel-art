import { GameObject, canvas } from '../../classes/game-object'
import { GameObjectTypes } from '../../utilities/enums'
import Entity from '../../classes/game-object/entity'
import AnimatedSprite from '../../classes/nodes/animated-sprite'
import Collision from '../../classes/nodes/collider'
import Sprite from '../../classes/nodes/sprite'
import Vector2 from '../../classes/vector2'
import { hasAZombie } from '../../utilities/zombies'
import AudioPlayer from '../../classes/nodes/audio-player'
import Plant from './plant'
import { PLANTS } from '../../utilities/enums/plants'
import Time from '../../utilities/importants/time'

const sprites = [
  '/sprites/plants/peashooter/idle3.png',
  '/sprites/plants/peashooter/attack.png',
]

export default class Peashooter extends Plant {
  #attacking = false

  #audiosList = {
    throw: new AudioPlayer('/audios/plants/peashooter/throw.ogg'),
    throw2: new AudioPlayer('/audios/plants/peashooter/throw2.ogg'),
  }

  collision: Collision = new Collision(
    this,
    new Vector2(6, 5),
    new Vector2(5, 11)
  )
  #animation = new AnimatedSprite(
    this.transform,
    new Vector2(16, 16),
    [
      '/sprites/plants/peashooter/idle1.png',
      '/sprites/plants/peashooter/idle2.png',
      '/sprites/plants/peashooter/idle1.png',
      '/sprites/plants/peashooter/idle3.png',
      // '/sprites/plants/peashooter/attack.png',
    ],
    2
  )

  nodes = [this.#animation]

  constructor(pos: Vector2) {
    super(pos, PLANTS.PEASHOOTER)

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
    new PeaProjectil(new Vector2(this.transform.x + 10, this.transform.y + 8))
  }

  update(): void {
    this.#attacking = hasAZombie(
      this.transform.roundedX + 9,
      this.transform.roundedY,
      canvas.width - this.transform.roundedX - 9,
      16
    )
    this.#animation.changeAnAnimation(3, sprites[this.#attacking ? 1 : 0])
  }
}

export const PEA_VELOCITY = 125
export const PEA_DAMAGE = 30

class PeaProjectil extends GameObject {
  #audioList = {
    splat: new AudioPlayer('/audios/plants/pea/splat.ogg'),
    splat2: new AudioPlayer('/audios/plants/pea/splat2.ogg'),
    splat3: new AudioPlayer('/audios/plants/pea/splat3.ogg'),
  }

  collision: Collision = new Collision(
    this,
    Vector2.ZERO,
    new Vector2(4, 4),
    GameObjectTypes.ZOMBIE
  )

  nodes = [
    new Sprite(
      '/sprites/projectiles/pea.png',
      this.transform,
      new Vector2(4, 4),
      { rawCoords: true }
    ),
  ]

  constructor(pos: Vector2) {
    super(GameObjectTypes.PROJECTIL, pos)

    this.collision.onCollision = (zombie) => {
      if (zombie instanceof Entity) {
        const random = Math.random()

        if (random < 0.33) {
          this.#audioList.splat.play()
        } else if (random < 0.67) {
          this.#audioList.splat2.play()
        } else {
          this.#audioList.splat3.play()
        }

        zombie.attack(PEA_DAMAGE)
        this.destroy()
      }
    }
  }

  update(): void {
    this.transform.x += Time.deltaTime * PEA_VELOCITY

    if (this.transform.x >= canvas.width) this.destroy()
  }
}
