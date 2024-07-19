import Collision from '../../../game-engine/nodes/collider'
import Sprite from '../../../game-engine/nodes/sprite'
import Vector2 from '../../../game-engine/utilities/vector2'
import { PLANTS } from '../../../utilities/enums/plants'
import Plant from '../plant'

export default class LilyPad extends Plant {
  collision: Collision = new Collision(
    this,
    new Vector2(2, 6),
    new Vector2(6, 5)
  )
  constructor(pos: Vector2, zIndex?: number) {
    super(pos, PLANTS.LILY_PAD, zIndex)
    this.nodes.push(
      new Sprite('/sprites/plants/pool/lily-pad.png', this.transform)
    )
  }
}
