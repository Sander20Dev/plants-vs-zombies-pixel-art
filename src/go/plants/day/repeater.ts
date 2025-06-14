import Collision from '../../../game-engine/nodes/collider'
import Vector2 from '../../../game-engine/utilities/vector2'
import { hasAZombie } from '../../../utilities/zombies'
import { MultipleAudioPlayer } from '../../../game-engine/nodes/audio-player'
import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import Plant from '../plant'
import { PLANTS } from '../../../utilities/enums/plants'
import SpriteTexture, {
  importSpriteSheet,
} from '../../../game-engine/utilities/sprite'
import Pea, { SHOOT_VELOCITY } from '../../projectils/pea'

const [idle1, idle2, idle3] = importSpriteSheet(
  '/sprites/plants/day/repeater/idle.png',
  new Vector2(16),
  3
)
const attack = new SpriteTexture('/sprites/plants/day/repeater/attack.png')

export default class Repeater extends Plant {
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
  #animationList = new AnimatedSpritesList(
    this.transform,
    {
      idle: {
        sprites: [idle1, idle2, idle1, idle3],
        fps: 4 / SHOOT_VELOCITY,
        loop: false,
      },
      attack: {
        sprites: [attack, idle3, attack, idle3],
        fps: 10,
        loop: false,
      },
    },
    'idle'
  )

  nodes = [this.#animationList]

  constructor(pos: Vector2, zIndex?: number) {
    super(pos, PLANTS.REAPEATER, zIndex)

    this.#animationList.animations.idle.play()

    this.#animationList.animations.idle.onEnd = () => {
      this.#attacking = hasAZombie(
        this.transform.x + 10,
        this.transform.y + 4,
        Vector2.SCREEN.x - this.transform.x - 10,
        8
      )

      if (this.#attacking) {
        this.#animationList.setCurrentAnimation('attack')
        this.#animationList.animations.attack.play()
      } else {
        this.#animationList.animations.idle.play()
      }
    }
    this.#animationList.animations.attack.onChange = (index) => {
      if (index === 0 || index === 2) {
        this.#generateAPea()
      }
    }

    this.#animationList.animations.attack.onEnd = () => {
      this.#animationList.setCurrentAnimation('idle')
      this.#animationList.animations.idle.play()
    }
  }

  #generateAPea() {
    if (Math.random() < 0.5) {
      this.#audiosList.throw.play()
    } else {
      this.#audiosList.throw2.play()
    }
    new Pea(new Vector2(this.transform.x + 11, this.transform.y + 8))
  }

  // update(): void {
  //   this.#attacking = hasAZombie(
  //     this.transform.roundedX,
  //     this.transform.roundedY,
  //     16,
  //     16
  //   )
  //   this.#animation.changeAnAnimation(3, sprites[this.#attacking ? 1 : 0])
  // }
}
