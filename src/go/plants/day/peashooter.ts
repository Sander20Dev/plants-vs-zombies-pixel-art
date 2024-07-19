import AnimatedSprite from '../../../game-engine/nodes/animated-sprite'
import Collision from '../../../game-engine/nodes/collider'
import Vector2 from '../../../game-engine/utilities/vector2'
import { hasAZombie } from '../../../utilities/zombies'
import { MultipleAudioPlayer } from '../../../game-engine/nodes/audio-player'
import Plant from '../plant'
import { PLANTS } from '../../../utilities/enums/plants'
import SpriteTexture from '../../../game-engine/utilities/sprite'
import Pea, { SHOOT_VELOCITY } from '../../projectils/pea'

const sprites = [
  '/sprites/plants/day/peashooter/idle3.png',
  '/sprites/plants/day/peashooter/attack.png',
]

export default class Peashooter extends Plant {
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
      new SpriteTexture('/sprites/plants/day/peashooter/idle1.png'),
      new SpriteTexture('/sprites/plants/day/peashooter/idle2.png'),
      new SpriteTexture('/sprites/plants/day/peashooter/idle1.png'),
      new SpriteTexture('/sprites/plants/day/peashooter/idle3.png'),
      // '/sprites/plants/day/peashooter/attack.png',
    ],
    4 / SHOOT_VELOCITY
  )

  nodes = [this.#animation]

  constructor(pos: Vector2, zIndex?: number) {
    super(pos, PLANTS.PEASHOOTER, zIndex)

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
      this.transform.x + 9,
      this.transform.y + 4,
      Vector2.SCREEN.x - this.transform.x - 9,
      8
    )
    this.#animation.changeAnAnimation(3, sprites[this.#attacking ? 1 : 0])
  }
}
