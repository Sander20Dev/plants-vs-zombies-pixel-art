import Vector2 from '../../../game-engine/utilities/vector2'
import { PLANTS } from '../../../utilities/enums/plants'
import NightPlant from './plant'
import SpriteTexture, {
  importSpriteSheet,
} from '../../../game-engine/utilities/sprite'
import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import { getCollide } from '../../../utilities/collide'
import { GameObjectTypes } from '../../../utilities/enums'
import Zombie from '../../zombies/_zombie'
import AudioPlayer from '../../../game-engine/nodes/audio-player'
import AnimationObject from '../../zombies/animations/_animation'

const idle = importSpriteSheet(
  '/sprites/plants/night/doom-shroom/idle.png',
  new Vector2(16),
  4
)
const sleep = new SpriteTexture('/sprites/plants/night/doom-shroom/sleep.png')

export default class DoomShroom extends NightPlant {
  doomSound = new AudioPlayer('/audios/effect/doom-shroom-explodes.ogg')

  animationList = new AnimatedSpritesList(
    this.transform,
    {
      idle: {
        sprites: idle,
        fps: 4,
        loop: false,
      },
      sleep: {
        sprites: [sleep],
        fps: 1,
      },
    },
    'sleep'
  )

  constructor(pos: Vector2, zIndex?: number) {
    super(pos, PLANTS.DOOM_SHROOM, undefined, zIndex)

    this.animationList.animations.idle.onEnd = () => {
      this.explode()
    }

    this.nodes.push(this.animationList)
  }

  explode() {
    this.doomSound.play()
    new DoomExplotion(this.transform.add(new Vector2(-32, -32)))

    const zombies = getCollide(
      this.transform.x + 8 - 56,
      this.transform.y + 8 - 56,
      112,
      112,
      GameObjectTypes.ZOMBIE
    )

    for (const zombie of zombies) {
      if (!(zombie instanceof Zombie)) continue

      zombie.attack(1800, 'fire')
    }

    this.destroy()
  }
}

const explotion = importSpriteSheet(
  '/sprites/plants/night/doom-shroom/doom.png',
  new Vector2(80),
  1
)

class DoomExplotion extends AnimationObject {
  constructor(pos: Vector2) {
    super(pos, explotion, 1, { loop: false }, 10)
  }
}
