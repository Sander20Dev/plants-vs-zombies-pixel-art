import { GameObjectTypes } from '../utilities/enums'
import { GameObject, IGOOptions } from '../game-engine/game-object'
import Vector2 from '../game-engine/utilities/vector2'

export default class Entity extends GameObject {
  constructor(
    type: GameObjectTypes,
    pos: Vector2,
    public health: number,
    public damage = 0,
    options?: IGOOptions
  ) {
    super(type, pos, options)
  }

  attack(damage: number) {
    this.health -= damage

    if (this.health <= 0) {
      this.destroy()
    }

    return this.health <= 0
  }
}
