import AnimatedSprite from '../../classes/nodes/animated-sprite'
import Collision from '../../classes/nodes/collider'
import Sun from '../../classes/sun'
import Vector2 from '../../classes/vector2'
import { PLANTS } from '../../utilities/enums/plants'
import Time from '../../utilities/importants/time'
import Plant from './plant'

const SUN_TIME = 48

export default class Sunflower extends Plant {
  collision: Collision = new Collision(
    this,
    new Vector2(5, 5),
    new Vector2(5, 10)
  )

  #animation = new AnimatedSprite(
    this.transform,
    new Vector2(16, 16),
    [
      '/sprites/plants/sunflower/idle1.png',
      '/sprites/plants/sunflower/idle2.png',
      '/sprites/plants/sunflower/idle1.png',
      '/sprites/plants/sunflower/idle3.png',
    ],
    2
  )

  nodes = [this.#animation]

  constructor(pos: Vector2) {
    super(pos, PLANTS.SUNFLOWER)
  }

  #generateSun() {
    new SunOfPlant(
      this.transform.add(
        new Vector2(
          Math.floor(Math.random() * 8),
          Math.floor(Math.random() * 8)
        )
      )
    )
  }

  #counter = 0
  #time = 12
  update(): void {
    this.#counter += Time.deltaTime

    if (this.#counter >= this.#time) {
      if (this.#time !== SUN_TIME) this.#time = SUN_TIME
      this.#counter -= SUN_TIME
      this.#generateSun()
    }
  }
}

class SunOfPlant extends Sun {
  constructor(pos: Vector2) {
    super(pos)
  }

  #max = Math.floor(Math.random() * 0.2) + 0.9
  #counter: number = this.#max

  update(): void {
    if (this.#counter < 0) {
      this.#counter = 2
    } else if (this.#counter <= this.#max) {
      this.#counter -= Time.deltaTime
      this.transform.y += Time.deltaTime * 10
    }
    super.update()
  }
}
