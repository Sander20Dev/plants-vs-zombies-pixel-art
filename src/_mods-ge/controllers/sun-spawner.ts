import { GameObjectTypes } from '../../utilities/enums'
import Time from '../../game-engine/utilities/time'
import { getRandomValue } from '../../utilities/random'
import { GameObject } from '../../game-engine/game-object'
import Sun from '../sun'
import Vector2 from '../../game-engine/utilities/vector2'

export default class SunSpawner extends GameObject {
  constructor() {
    super(GameObjectTypes.UI, Vector2.ZERO)
  }

  #counter = 5

  update() {
    this.#counter += Time.deltaTime

    if (this.#counter >= 10) {
      this.#counter -= 10
      new SunOfSky()
    }
  }
}

class SunOfSky extends Sun {
  constructor() {
    const pos = new Vector2(getRandomValue(136, 40), 0)
    super(pos)
  }

  #max = getRandomValue(72, 24)
  #isSkying = true

  update(): void {
    if (this.clicked && this.#isSkying) this.#isSkying = false

    if (this.#isSkying) {
      if (this.transform.y < this.#max) {
        if (this.transform.y + Time.deltaTime * 20 >= this.#max) {
          this.transform.y = this.#max
        } else {
          this.transform.y += Time.deltaTime * 20
        }
      } else {
        this.#isSkying = false
      }
    }
    super.update()
  }
}
