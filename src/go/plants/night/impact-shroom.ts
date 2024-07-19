import AnimatedSprite from '../../../game-engine/nodes/animated-sprite'
import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import Collision from '../../../game-engine/nodes/collider'
import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import Vector2 from '../../../game-engine/utilities/vector2'
import { getCollide } from '../../../utilities/collide'
import { GameObjectTypes } from '../../../utilities/enums'
import { PLANTS } from '../../../utilities/enums/plants'
import { hasAZombie } from '../../../utilities/zombies'
import { PEA_DAMAGE } from '../../projectils/pea'
import Zombie from '../../zombies/_zombie'
import NightPlant from './plant'

const [idle1, idle2] = importSpriteSheet(
  '/sprites/plants/night/impact-shroom/idle.png',
  new Vector2(16),
  3
)

const attaking = importSpriteSheet(
  '/sprites/plants/night/impact-shroom/attacking.png',
  new Vector2(16),
  9
)

const waves = importSpriteSheet(
  '/sprites/plants/night/impact-shroom/waves.png',
  new Vector2(48),
  8
)

export default class ImpactShroom extends NightPlant {
  animationList = new AnimatedSpritesList(
    this.transform,
    {
      idle: {
        sprites: [idle1, idle1, idle1, idle2],
        fps: 4,
      },
      startAttack: {
        sprites: attaking.slice(0, 6),
        fps: 6,
        loop: false,
      },
      endAttack: {
        sprites: attaking.slice(6),
        fps: 3,
        loop: false,
      },
      sleep: {
        sprites: [idle2],
        fps: 1,
      },
    },
    'sleep'
  )

  wavesAnimation

  collision: Collision = new Collision(
    this,
    new Vector2(6, 5),
    new Vector2(5, 11),
    GameObjectTypes.ZOMBIE
  )

  constructor(pos: Vector2, zIndex?: number) {
    super(pos, PLANTS.IMPACT_SHROOM, undefined, zIndex)

    this.wavesAnimation = new AnimatedSprite(
      this.transform.add(new Vector2(-16, -16)),
      waves,
      24,
      { loop: false }
    )
    this.wavesAnimation.ignore = true
    this.wavesAnimation.onEnd = () => {
      this.wavesAnimation.ignore = true
    }

    this.animationList.animations.startAttack.onChange = (i) => {
      if (i === 5) {
        this.doAttack()
      }
    }

    this.animationList.animations.startAttack.onEnd = () => {
      this.animationList.setCurrentAnimation('endAttack', true)
    }
    this.animationList.animations.endAttack.onEnd = () => {
      if (this.canAttack()) {
        this.animationList.setCurrentAnimation('startAttack', true)
      } else {
        this.animationList.setCurrentAnimation('idle', true)
      }
    }
    this.animationList.animations.idle.onChange = (i) => {
      if (i !== 3) return

      if (this.canAttack()) {
        this.animationList.setCurrentAnimation('startAttack', true)
      }
    }

    this.nodes.push(this.animationList, this.wavesAnimation)
  }

  canAttack() {
    return hasAZombie(this.transform.x - 16, this.transform.y - 16, 48, 48)
  }

  doAttack() {
    const zombies = getCollide(
      this.transform.x - 16,
      this.transform.y - 16,
      48,
      48,
      GameObjectTypes.ZOMBIE
    )

    for (const zombie of zombies) {
      if (!(zombie instanceof Zombie)) return

      zombie.attack(PEA_DAMAGE * 2)
    }

    this.wavesAnimation.ignore = false
    this.wavesAnimation.play()
    this.wavesAnimation.setAnimationIndex(0)
  }
}
