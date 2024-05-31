import { GameObject, ctx } from '../game-engine/game-object'
import Vector2 from '../game-engine/utilities/vector2'
import { GameObjectTypes } from '../utilities/enums'

export default class Square extends GameObject {
  constructor(pos: Vector2, public scale: Vector2) {
    super(GameObjectTypes.ANIMATION, pos)
  }

  draw(): void {
    ctx.fillStyle = '#0068'
    ctx.fillRect(
      this.transform.roundedX,
      this.transform.roundedY,
      this.scale.x,
      this.scale.y
    )
  }
}
