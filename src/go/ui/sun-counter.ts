import { GameObject } from '../../game-engine/game-object'
import Sprite from '../../game-engine/nodes/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { suns } from '../../states'
import { drawCharacter } from '../../utilities/characters'
import { GameObjectTypes } from '../../utilities/enums'

function drawNumbers(num: number, transform: Vector2) {
  drawCharacter(num.toString(), transform)
}

export default class SunCounter extends GameObject {
  nodes = [new Sprite('/sprites/ui/sun-counter.png', this.transform)]

  numberPos = new Vector2(49, 10)
  constructor() {
    super(GameObjectTypes.UI, new Vector2(39, 8))
  }

  draw() {
    drawNumbers(suns.current, this.numberPos)
  }
}
