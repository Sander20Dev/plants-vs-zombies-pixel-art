import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import { MultipleAudioPlayer } from '../../../game-engine/nodes/audio-player'
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
  '/sprites/plants/night/scaredy-shroom/idle.png',
  new Vector2(16),
  2
)
const attack = new SpriteTexture(
  '/sprites/plants/night/scaredy-shroom/attack.png'
)

export default class ScaredyShroom extends NightPlant {
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
      hiding: {
        sprites: importSpriteSheet(
          '/sprites/plants/night/scaredy-shroom/hiding.png',
          new Vector2(16),
          5
        ),
        fps: 5,
        loop: false,
      },
      wakingUp: {
        sprites: importSpriteSheet(
          '/sprites/plants/night/scaredy-shroom/hiding.png',
          new Vector2(16),
          5
        ).reverse(),
        fps: 5,
        loop: false,
      },
      hide: {
        sprites: importSpriteSheet(
          '/sprites/plants/night/scaredy-shroom/hide.png',
          new Vector2(16),
          2
        ),
        fps: 8,
      },
      sleep: {
        sprites: [idle[1]],
        fps: 1,
      },
    },
    'sleep'
  )

  #attacking = false

  constructor(pos: Vector2, zIndex?: number) {
    super(pos, PLANTS.SCAREDY_SHROOM, undefined, zIndex)
    this.animationList.animations.idle.onChange = (index) => {
      if (index === 3) {
        this.#attacking = hasAZombie(
          this.transform.x + 9,
          this.transform.y,
          184 - this.transform.x - 9,
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
    this.animationList.animations.hiding.onEnd = () => {
      this.animationList.setCurrentAnimation('hide', true)
    }
    this.animationList.animations.wakingUp.onEnd = () => {
      this.hiding = false
      this.animationList.setCurrentAnimation('idle', true)
    }

    this.nodes.push(this.animationList)
  }

  collision: Collision = new Collision(
    this,
    new Vector2(4, 6),
    new Vector2(6, 10)
  )

  puff = new MultipleAudioPlayer('/audios/effect/puff.ogg')
  #generateASpore() {
    // if (Math.random() < 0.5) {
    //   this.#audiosList.throw.play()
    // } else {
    //   this.#audiosList.throw2.play()
    // }
    this.puff.play()
    new Spore(new Vector2(this.transform.x + 11, this.transform.y + 9))
  }

  hiding = false
  update(): void {
    if (!this.sleeping) {
      if (hasAZombie(this.transform.x - 16, this.transform.y - 16, 48, 48)) {
        if (this.hiding) return
        this.hiding = true
        this.animationList.setCurrentAnimation('hiding', true)
        return
      }

      if (this.hiding) {
        if (this.animationList.currentAnimationName === 'hide') {
          this.animationList.setCurrentAnimation('wakingUp', true)
        }
      }
    }

    super.update()
  }
}
