import { GameObject } from '../../classes/game-object'
import Sprite from '../../classes/nodes/sprite'
import Vector2 from '../../classes/vector2'
import { suns } from '../../states'
import { drawCharacter } from '../../utilities/characters'
import { GameObjectTypes } from '../../utilities/enums'

function drawNumbers(num: number, transform: Vector2) {
  drawCharacter(num.toString(), transform)
}

export default class SunCounter extends GameObject {
  nodes = [
    new Sprite(
      '/sprites/ui/sun-counter.png',
      this.transform,
      new Vector2(26, 9)
    ),
  ]

  numberPos = new Vector2(49, 10)
  constructor() {
    super(GameObjectTypes.UI, new Vector2(39, 8))
  }

  draw() {
    drawNumbers(suns.current, this.numberPos)
  }
}
