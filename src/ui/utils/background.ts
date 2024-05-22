import { GameObject } from '../../classes/game-object'
import Sprite from '../../classes/nodes/sprite'
import Vector2 from '../../classes/vector2'
import { GameObjectTypes } from '../../utilities/enums'

export default class Background extends GameObject {
  constructor(src: string, pos = new Vector2(0, 0)) {
    super(GameObjectTypes.BACKGROUND, pos)

    this.nodes = [new Sprite(src, this.transform, Vector2.ZERO)]
  }
}
