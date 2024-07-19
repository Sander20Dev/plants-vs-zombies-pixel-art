import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import Vector2 from '../../../game-engine/utilities/vector2'
import { PLANTS } from '../../../utilities/enums/plants'
import NightPlant from './plant'
import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import { Views } from '../../../game-engine/lib/loader'
import { GameObjectTypes } from '../../../utilities/enums'
import Zombie from '../../zombies/_zombie'

const idle = importSpriteSheet(
  '/sprites/plants/night/ice-shroom/idle.png',
  new Vector2(16),
  4
)

export default class IceShroom extends NightPlant {
  animationList = new AnimatedSpritesList(
    this.transform,
    {
      idle: {
        sprites: idle,
        fps: 4,
        loop: false,
      },
      sleep: {
        sprites: [idle[2]],
        fps: 1,
      },
    },
    'sleep'
  )

  constructor(pos: Vector2, zIndex?: number) {
    super(pos, PLANTS.ICE_SHROOM, undefined, zIndex)
    this.animationList.animations.idle.onEnd = () => {
      const zombies = Views.get(GameObjectTypes.ZOMBIE).filter(
        (n) => n instanceof Zombie
      ) as Zombie[]
      zombies.forEach((z) => {
        z.effects.setIce(true)
        z.attack(20)
      })
      this.destroy()
    }

    this.nodes.push(this.animationList)
  }
}
