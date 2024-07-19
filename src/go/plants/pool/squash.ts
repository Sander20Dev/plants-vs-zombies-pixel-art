import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import Collision from '../../../game-engine/nodes/collider'
import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import Time from '../../../game-engine/utilities/time'
import Vector2 from '../../../game-engine/utilities/vector2'
import { getCollide } from '../../../utilities/collide'
import { GameObjectTypes } from '../../../utilities/enums'
import { PLANTS } from '../../../utilities/enums/plants'
import Zombie from '../../zombies/_zombie'
import Plant from '../plant'

const idle = importSpriteSheet(
  '/sprites/plants/pool/squash/idle.png',
  new Vector2(16, 16),
  1
)
const squashing = importSpriteSheet(
  '/sprites/plants/pool/squash/squashing.png',
  new Vector2(16, 16),
  15
)

export default class Squash extends Plant {
  collision: Collision = new Collision(
    this,
    new Vector2(6, 8),
    new Vector2(5, 6)
  )
  #animationList = new AnimatedSpritesList(
    this.transform,
    {
      idle: { sprites: idle, fps: 1 },
      squashing: { sprites: squashing, fps: 7.5, loop: false },
    },
    'idle'
  )
  #zombieDetected = false
  #zombie: Zombie | null = null
  #jumping = false
  #end = false
  constructor(pos: Vector2, zIndex?: number) {
    super(pos, PLANTS.SQUASH, zIndex)
    this.nodes.push(this.#animationList)
    this.#animationList.animations.idle.play()

    this.#animationList.animations.squashing.onChange = (i) => {
      if (i === 5) {
        this.#Vx = (this.#zombie!.transform.x - 4 - this.transform.x) / 1.2
        this.#jumping = true
      }
    }
    this.#animationList.animations.squashing.onEnd = () => (this.#end = true)
  }

  #Vo = -80 / 3
  #g = 400 / 9
  #yo = 0

  #Vx = 0

  update() {
    if (this.#zombieDetected) {
      if (this.#jumping) {
        this.#Vo += this.#g * Time.deltaTime
        this.transform.y +=
          this.#Vo * Time.deltaTime +
          this.#g * Time.deltaTime * Time.deltaTime * 0.5

        this.transform.x += this.#Vx * Time.deltaTime

        if (this.#yo < this.transform.y) {
          this.transform.y = this.#yo
          this.#jumping = false
        }
      } else if (this.#end) {
        getCollide(
          this.transform.x + 6,
          this.transform.y + 8,
          5,
          6,
          GameObjectTypes.ZOMBIE
        )
          .filter((n) => n instanceof Zombie)
          .forEach((n) => n.attack(this.damage))
        this.destroy()
      }
      return
    }

    const [zombie] = getCollide(
      this.transform.x - 16,
      this.transform.y + 4,
      48,
      8,
      GameObjectTypes.ZOMBIE
    )
      .filter((n) => n instanceof Zombie)
      .sort((a, b) => {
        return (
          Math.abs(a.transform.x - this.transform.x) -
          Math.abs(b.transform.x - this.transform.x)
        )
      })

    if (zombie == null) return
    this.#animationList.setCurrentAnimation('squashing', true)
    this.#zombieDetected = true
    this.collision.invulnerable = true
    this.#zombie = zombie
    this.#yo = this.transform.y
  }
}
