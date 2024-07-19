import AnimatedSprite from '../../../game-engine/nodes/animated-sprite'
import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import { MultipleAudioPlayer } from '../../../game-engine/nodes/audio-player'
import Collision from '../../../game-engine/nodes/collider'
import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import Time from '../../../game-engine/utilities/time'
import Vector2 from '../../../game-engine/utilities/vector2'
import { PLANTS } from '../../../utilities/enums/plants'
import { hasAZombie } from '../../../utilities/zombies'
import Pea, { SHOOT_VELOCITY } from '../../projectils/pea'
import Plant from '../plant'

const idle = importSpriteSheet(
  '/sprites/plants/pool/threepeater/idle.png',
  new Vector2(16),
  2
)
const [attack] = importSpriteSheet(
  '/sprites/plants/pool/threepeater/attack.png',
  new Vector2(16),
  1
)

export default class Threepeater extends Plant {
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
    [...idle, ...idle],
    4 / SHOOT_VELOCITY
  )

  constructor(pos: Vector2, zIndex?: number) {
    super(pos, PLANTS.THREEPEATER, zIndex)
    this.#animation.onChange = (index) => {
      if (this.#attacking && index === 3) {
        this.#generateAPea()
      }
    }

    this.nodes.push(this.#animation)
  }

  #generateAPea() {
    for (let i = 0; i < 3; i++) {
      if (Math.random() < 0.5) {
        this.#audiosList.throw.play()
      } else {
        this.#audiosList.throw2.play()
      }
    }
    if (this.transform.y - 15 > 0) {
      new TopPea(
        new Vector2(this.transform.x + 10, this.transform.y /*  - 7 */ + 8),
        true
      )
    }
    if (this.transform.y + 15 < Vector2.SCREEN.y) {
      new TopPea(
        new Vector2(this.transform.x + 10, this.transform.y /* + 23 */ + 8),
        false
      )
    }
    new Pea(new Vector2(this.transform.x + 10, this.transform.y + 8))
  }

  #hasAZombie() {
    return hasAZombie(
      this.transform.x + 9,
      this.transform.y - 12,
      Vector2.SCREEN.x - this.transform.x - 9,
      40
    )
  }

  update(): void {
    this.#attacking = this.#hasAZombie()
    this.#animation.changeAnAnimation(3, this.#attacking ? attack : idle[1])
  }
}

class TopPea extends Pea {
  startY
  vY = -60
  aceleration = 70
  constructor(pos: Vector2, public top: boolean) {
    super(pos)
    this.startY = pos.y
    if (!top) {
      this.vY *= -1
      this.aceleration *= -1
    }
  }

  // El guisante tendrá que acelerar hasta alcanzar una velocidad máxima
  // Luego la velocidad descenderá progresivamente a 0

  ended = false

  update(): void {
    super.update()
    if (this.ended) return
    this.vY += this.aceleration * Time.deltaTime
    this.transform.y +=
      this.vY * Time.deltaTime +
      this.aceleration * Time.deltaTime * Time.deltaTime
    if (this.top) {
      if (this.transform.y <= this.startY - 15 || Math.abs(this.vY) < 0.2) {
        this.transform.y = this.startY - 15
        this.aceleration = 0
        this.ended = true
      }
    } else {
      if (this.transform.y >= this.startY + 15 || Math.abs(this.vY) < 0.2) {
        this.transform.y = this.startY + 15
        this.aceleration = 0
        this.ended = true
      }
    }
  }
}
