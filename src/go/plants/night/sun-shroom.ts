import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import Collision from '../../../game-engine/nodes/collider'
import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import Time from '../../../game-engine/utilities/time'
import Vector2 from '../../../game-engine/utilities/vector2'
import { Counter } from '../../../utilities/delta'
import { PLANTS } from '../../../utilities/enums/plants'
import Plant from '../plant'
import { SunOfPlant } from '../sunflower'

const [smallIdle1, smallIdle2] = importSpriteSheet(
  '/sprites/plants/night/sun-shroom/small-idle.png',
  new Vector2(16),
  2
)
const [largeIdle1, largeIdle2] = importSpriteSheet(
  '/sprites/plants/night/sun-shroom/large-idle.png',
  new Vector2(16),
  2
)

const SUN_TIME = 48

export default class SunShroom extends Plant {
  collision: Collision = new Collision(
    this,
    new Vector2(4, 8),
    new Vector2(7, 8)
  )

  #animation = new AnimatedSpritesList(
    this.transform,
    {
      transition: {
        sprites: importSpriteSheet(
          '/sprites/plants/night/sun-shroom/transition.png',
          new Vector2(16),
          3
        ),
        fps: 3,
        loop: false,
      },
      small: {
        sprites: [smallIdle1, smallIdle2, smallIdle1, smallIdle1],
        fps: 2,
      },
      large: {
        sprites: [largeIdle1, largeIdle2, largeIdle1, largeIdle1],
        fps: 2,
      },
    },
    'small'
  )

  large = false

  #counter = new Counter(120, () => {
    this.#animation.setCurrentAnimation('transition', true)
    this.#animation.animations.transition.onEnd = () => {
      this.#animation.setCurrentAnimation('large', true)
      this.large = true
    }
  })

  nodes = [this.#animation]

  constructor(pos: Vector2) {
    super(pos, PLANTS.SUN_SHROOM)

    this.#counter.play()
  }

  #generateSun() {
    new SunOfPlant(
      this.transform.add(
        new Vector2(
          Math.floor(Math.random() * 8),
          Math.floor(Math.random() * 8)
        )
      ),
      this.large ? 2 : 1
    )
  }

  #sunCounter = 0
  #time = 7
  update(): void {
    this.#sunCounter += Time.deltaTime

    if (this.#sunCounter >= this.#time) {
      if (this.#time !== 24) this.#time = 24
      this.#sunCounter -= SUN_TIME
      this.#generateSun()
    }

    this.#counter.updater()
  }
}
