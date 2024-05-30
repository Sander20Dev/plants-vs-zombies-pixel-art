import { GameObject } from '../../game-engine/game-object'
import Sprite from '../../game-engine/nodes/sprite'
import SpriteTexture from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { GameObjectTypes } from '../../utilities/enums'

export default class Background extends GameObject {
  constructor(src: SpriteTexture, pos = new Vector2(0, 0)) {
    super(GameObjectTypes.BACKGROUND, pos)

    this.nodes = [new Sprite(src, this.transform)]
  }
}
