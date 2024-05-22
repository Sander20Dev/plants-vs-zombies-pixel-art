import { GameObjectTypes } from '../../utilities/enums'
import { GameObject } from '../game-object'
import Vector2 from '../vector2'

export default class Entity extends GameObject {
  constructor(
    type: GameObjectTypes,
    pos: Vector2,
    public health: number,
    public damage = 0
  ) {
    super(type, pos)
  }

  attack(damage: number) {
    this.health -= damage

    if (this.health <= 0) this.destroy()
  }
}
