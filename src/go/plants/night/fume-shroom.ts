import { GameObject } from '../../../game-engine/game-object'
import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import Collision from '../../../game-engine/nodes/collider'
import Sprite from '../../../game-engine/nodes/sprite'
import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import Time from '../../../game-engine/utilities/time'
import Vector2 from '../../../game-engine/utilities/vector2'
import { getCollide } from '../../../utilities/collide'
import { GameObjectTypes } from '../../../utilities/enums'
import { PLANTS } from '../../../utilities/enums/plants'
import { hasAZombie } from '../../../utilities/zombies'
import { PEA_DAMAGE, SHOOT_VELOCITY } from '../../projectils/pea'
import Zombie from '../../zombies/_zombie'
import NightPlant from './plant'

const idle = importSpriteSheet(
  '/sprites/plants/night/fume-shroom/idle.png',
  new Vector2(16),
  2
)
const attack = importSpriteSheet(
  '/sprites/plants/night/fume-shroom/attack.png',
  new Vector2(16),
  3
)

export default class FumeShroom extends NightPlant {
  animationList = new AnimatedSpritesList(
    this.transform,
    {
      idle: {
        sprites: [idle[0], idle[0], idle[0], idle[1]],
        fps: 4 / SHOOT_VELOCITY,
      },
      attack: {
        sprites: [
          attack[0],
          attack[1],
          attack[1],
          attack[1],
          attack[1],
          attack[1],
          attack[2],
        ],
        fps: 5,
        loop: false,
      },
      sleep: {
        sprites: [idle[1]],
        fps: 1,
      },
    },
    'idle'
  )

  maxPos

  constructor(pos: Vector2) {
    super(pos, PLANTS.PUFF_SHROOM)

    this.animationList.animations.idle.onChange = (i) => {
      const attacking = hasAZombie(
        this.transform.roundedX + 9,
        this.transform.roundedY,
        this.maxPos.add(new Vector2(-this.transform.x - 9, 0)).x,
        16
      )

      if (i === 3 && attacking) {
        this.animationList.setCurrentAnimation('attack', true)
      }
    }
    this.animationList.animations.attack.onEnd = () => {
      this.animationList.setCurrentAnimation('idle', true)
    }

    this.maxPos = new Vector2(
      Math.min(this.transform.roundedX + 80, 192),
      this.transform.y
    )

    this.nodes.push(this.animationList)
  }

  collision: Collision = new Collision(
    this,
    new Vector2(3, 6),
    new Vector2(7, 10)
  )

  #fumeSpore = new FumeSpore(
    new Vector2(this.transform.x + 16, this.transform.y),
    this.transform
  )

  #fumeSporeManager() {
    if (this.animationList.currentAnimationName !== 'attack') {
      this.#fumeSpore.hide = true
      return
    }

    if (
      this.animationList.animations.attack.currentAnimation < 7 &&
      this.animationList.animations.attack.currentAnimation > 0
    ) {
      const i = Math.abs(
        this.animationList.animations.attack.currentAnimation - 3
      )
      this.#fumeSpore.sprite.filters =
        'opacity(' + (i === 0 ? 100 : 100 / i) + '%)'

      this.#fumeSpore.hide = false
    }
  }

  update(): void {
    this.#fumeSporeManager()

    super.update()
  }
}

export class FumeSpore extends GameObject {
  maxPos

  sprite

  constructor(pos: Vector2, public plantPos: Vector2) {
    super(GameObjectTypes.PROJECTIL, pos)

    this.sprite = new Sprite(
      '/sprites/projectiles/fume-spore.png',
      this.plantPos
    )
    this.nodes = [this.sprite]

    this.maxPos = new Vector2(
      Math.min(this.plantPos.roundedX + 80, 192),
      this.transform.y
    )

    // new Square(
    //   plantPos.add(new Vector2(9, 0)),
    //   this.maxPos.add(new Vector2(-this.plantPos.x - 9, -this.plantPos.y + 16))
    // )
  }

  update(): void {
    if (this.hide) return

    const zombies = getCollide(
      this.plantPos.roundedX + 9,
      this.plantPos.roundedY,
      this.maxPos.add(new Vector2(-this.plantPos.x - 9, 0)).x,
      16,
      GameObjectTypes.ZOMBIE
    )

    for (const zombie of zombies) {
      if (zombie instanceof Zombie) {
        zombie.attack(1.5 * PEA_DAMAGE * Time.deltaTime)
      }
    }
  }
}
