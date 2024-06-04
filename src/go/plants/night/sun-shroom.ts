import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import Collision from '../../../game-engine/nodes/collider'
import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import Time from '../../../game-engine/utilities/time'
import Vector2 from '../../../game-engine/utilities/vector2'
import { Counter } from '../../../utilities/delta'
import { PLANTS } from '../../../utilities/enums/plants'
import { SunOfPlant } from '../sunflower'
import NightPlant from './plant'

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

export default class SunShroom extends NightPlant {
  collision: Collision = new Collision(
    this,
    new Vector2(4, 8),
    new Vector2(7, 8)
  )

  animationList = new AnimatedSpritesList(
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
      sleep: {
        sprites: [smallIdle2],
        fps: 1,
      },
    },
    'sleep'
  )

  large = false

  #counter = new Counter(120, () => {
    this.animationList.setCurrentAnimation('transition', true)
    this.animationList.animations.transition.onEnd = () => {
      this.animationList.setCurrentAnimation('large', true)
      this.large = true
    }
  })

  nodes = [this.animationList]

  constructor(pos: Vector2) {
    super(pos, PLANTS.SUN_SHROOM, 'small')
  }

  start(): void {
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
      this.large ? 25 : 15
    )
  }

  #sunCounter = 0
  #time = 7
  update(): void {
    if (!this.sleeping) {
      this.#sunCounter += Time.deltaTime

      if (this.#sunCounter >= this.#time) {
        if (this.#time !== 24) this.#time = 24
        this.#sunCounter -= SUN_TIME
        this.#generateSun()
      }

      this.#counter.updater()
    }
    super.update()
  }
}
