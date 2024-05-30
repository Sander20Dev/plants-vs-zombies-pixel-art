import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import Vector2 from '../../../game-engine/utilities/vector2'
import AnimationObject from './_animation'

export default class Headless extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      importSpriteSheet(
        '/sprites/zombies/zombie/headless.png',
        new Vector2(16),
        10
      ),
      10,
      { loop: false }
    )
  }
}

export class Fired extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      importSpriteSheet(
        '/sprites/zombies/zombie/fired.png',
        new Vector2(16),
        10
      ),
      10,
      { loop: false }
    )
  }
}
