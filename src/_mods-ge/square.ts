import { GameObject, ctx } from '../game-engine/game-object'
import Vector2 from '../game-engine/utilities/vector2'
import { GameObjectTypes } from '../utilities/enums'

export default class Square extends GameObject {
  color = '#000000'

  constructor(pos: Vector2, public scale: Vector2) {
    super(GameObjectTypes.ANIMATION, pos)
  }

  draw(): void {
    ctx.fillStyle = this.color
    ctx.fillRect(this.transform.x, this.transform.y, this.scale.x, this.scale.y)
  }
}
