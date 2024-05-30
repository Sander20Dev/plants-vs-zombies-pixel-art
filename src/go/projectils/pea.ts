import Entity from '../../_mods-ge/entity'
import { GameObject, canvas } from '../../game-engine/game-object'
import AudioPlayer from '../../game-engine/nodes/audio-player'
import Collision from '../../game-engine/nodes/collider'
import Sprite from '../../game-engine/nodes/sprite'
import Time from '../../game-engine/utilities/time'
import Vector2 from '../../game-engine/utilities/vector2'
import { GameObjectTypes } from '../../utilities/enums'
import { getRandomValue } from '../../utilities/random'

export const PEA_VELOCITY = 70
export const PEA_DAMAGE = 20

export const SHOOT_VELOCITY = 1.5

export default class Pea extends GameObject {
  collideSounds = [
    new AudioPlayer('/audios/plants/pea/splat.ogg'),
    new AudioPlayer('/audios/plants/pea/splat2.ogg'),
    new AudioPlayer('/audios/plants/pea/splat3.ogg'),
  ]

  collision: Collision = new Collision(
    this,
    Vector2.ZERO,
    new Vector2(4, 4),
    GameObjectTypes.ZOMBIE
  )

  nodes = [
    new Sprite('/sprites/projectiles/pea.png', this.transform, {
      rawCoords: true,
    }),
  ]

  constructor(pos: Vector2) {
    super(GameObjectTypes.PROJECTIL, pos)

    this.collision.onCollision = (zombie) => {
      if (zombie instanceof Entity) {
        this.collideSounds[getRandomValue(this.collideSounds.length, 0)].play()

        zombie.attack(PEA_DAMAGE)
        this.destroy()
      }
    }
  }

  update(): void {
    this.transform.x += Time.deltaTime * PEA_VELOCITY

    if (this.transform.x >= canvas.width) this.destroy()
  }
}
