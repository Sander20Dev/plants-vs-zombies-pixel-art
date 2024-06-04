import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import Collision from '../../../game-engine/nodes/collider'
import SpriteTexture, {
  importSpriteSheet,
} from '../../../game-engine/utilities/sprite'
import Vector2 from '../../../game-engine/utilities/vector2'
import { PLANTS } from '../../../utilities/enums/plants'
import { hasAZombie } from '../../../utilities/zombies'
import { SHOOT_VELOCITY } from '../../projectils/pea'
import Spore from '../../projectils/spore'
import NightPlant from './plant'

const idle = importSpriteSheet(
  '/sprites/plants/night/puff-shroom/idle.png',
  new Vector2(16),
  2
)
const attack = new SpriteTexture('/sprites/plants/night/puff-shroom/attack.png')

export default class PuffShroom extends NightPlant {
  animationList = new AnimatedSpritesList(
    this.transform,
    {
      idle: {
        sprites: [idle[0], idle[0], idle[0], idle[1]],
        fps: 4 / SHOOT_VELOCITY,
      },
      attack: {
        sprites: [attack],
        fps: 4 / SHOOT_VELOCITY,
        loop: false,
      },
      sleep: {
        sprites: [idle[1]],
        fps: 1,
      },
    },
    'sleep'
  )

  #attacking = false

  maxPos

  constructor(pos: Vector2) {
    super(pos, PLANTS.PUFF_SHROOM)
    this.animationList.animations.idle.onChange = (index) => {
      if (index === 3) {
        this.#attacking = hasAZombie(
          this.transform.roundedX + 7,
          this.transform.roundedY,
          this.maxPos.add(new Vector2(-this.transform.x - 7, 0)).x,
          16
        )

        if (this.#attacking) {
          this.#generateASpore()
          this.animationList.setCurrentAnimation('attack', true)
        }
      }
    }
    this.animationList.animations.attack.onEnd = () => {
      this.animationList.setCurrentAnimation('idle', true)
    }

    this.maxPos = new Vector2(
      Math.min(this.transform.roundedX + 64, 200),
      this.transform.y
    )

    this.nodes.push(this.animationList)
  }

  collision: Collision = new Collision(
    this,
    new Vector2(4, 9),
    new Vector2(7, 7)
  )

  #generateASpore() {
    // if (Math.random() < 0.5) {
    //   this.#audiosList.throw.play()
    // } else {
    //   this.#audiosList.throw2.play()
    // }
    new Spore(
      new Vector2(this.transform.x + 11, this.transform.y + 11),
      this.maxPos
    )
  }
}
