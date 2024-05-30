import { canvas } from '../../game-engine/game-object'
import AnimatedSprite from '../../game-engine/nodes/animated-sprite'
import Collision from '../../game-engine/nodes/collider'
import Vector2 from '../../game-engine/utilities/vector2'
import { hasAZombie } from '../../utilities/zombies'
import AudioPlayer from '../../game-engine/nodes/audio-player'
import Plant from './plant'
import { PLANTS } from '../../utilities/enums/plants'
import SpriteTexture from '../../game-engine/utilities/sprite'
import Pea, { SHOOT_VELOCITY } from '../projectils/pea'

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
    [
      new SpriteTexture('/sprites/plants/peashooter/idle1.png'),
      new SpriteTexture('/sprites/plants/peashooter/idle2.png'),
      new SpriteTexture('/sprites/plants/peashooter/idle1.png'),
      new SpriteTexture('/sprites/plants/peashooter/idle3.png'),
      // '/sprites/plants/peashooter/attack.png',
    ],
    4 / SHOOT_VELOCITY
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
    new Pea(new Vector2(this.transform.x + 10, this.transform.y + 8))
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

export const PEA_VELOCITY = 100
export const PEA_DAMAGE = 20
