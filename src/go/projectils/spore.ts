import Sprite from '../../game-engine/nodes/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import Pea from './pea'

export default class Spore extends Pea {
  constructor(pos: Vector2, public maxPos?: Vector2) {
    super(pos)

    this.nodes = [
      new Sprite('/sprites/projectiles/spore.png', this.transform, {
        rawCoords: true,
      }),
    ]
  }

  update(): void {
    if (this.maxPos && this.transform.x >= this.maxPos.x - 4) {
      this.destroy()
      return
    }
    super.update()
  }
}
