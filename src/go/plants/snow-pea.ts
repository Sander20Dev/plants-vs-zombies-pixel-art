import { GameObject, canvas } from '../../game-engine/game-object'
import { GameObjectTypes } from '../../utilities/enums'
import AnimatedSprite from '../../game-engine/nodes/animated-sprite'
import Collision from '../../game-engine/nodes/collider'
import Sprite from '../../game-engine/nodes/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { hasAZombie } from '../../utilities/zombies'
import AudioPlayer from '../../game-engine/nodes/audio-player'
import Zombie from '../zombies/_zombie'
import { PLANTS } from '../../utilities/enums/plants'
import Plant from './plant'
import Time from '../../game-engine/utilities/time'
import { PEA_DAMAGE, PEA_VELOCITY } from './peashooter'
import SpriteTexture from '../../game-engine/utilities/sprite'
import { SHOOT_VELOCITY } from '../projectils/pea'

const sprites = [
  '/sprites/plants/snow-pea/idle3.png',
  '/sprites/plants/snow-pea/attack.png',
]

export default class SnowPea extends Plant {
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
    [
      new SpriteTexture('/sprites/plants/snow-pea/idle1.png'),
      new SpriteTexture('/sprites/plants/snow-pea/idle2.png'),
      new SpriteTexture('/sprites/plants/snow-pea/idle1.png'),
      new SpriteTexture('/sprites/plants/snow-pea/idle3.png'),
      // '/sprites/plants/snow-pea/attack.png',
    ],
    4 / SHOOT_VELOCITY
  )

  nodes = [this.#animation]

  constructor(pos: Vector2) {
    super(pos, PLANTS.SNOW_PEA)

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
      this.transform.roundedX + 9,
      this.transform.roundedY,
      canvas.width - this.transform.roundedX - 9,
      16
    )
    this.#animation.changeAnAnimation(3, sprites[this.#attacking ? 1 : 0])
  }
}

class SnowPeaProjectil extends GameObject {
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
    new Sprite('/sprites/projectiles/snow-pea.png', this.transform, {
      rawCoords: true,
    }),
  ]

  constructor(pos: Vector2) {
    super(GameObjectTypes.PROJECTIL, pos)

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

  update(): void {
    this.transform.x += Time.deltaTime * PEA_VELOCITY

    if (this.transform.x >= canvas.width) this.destroy()
  }
}
