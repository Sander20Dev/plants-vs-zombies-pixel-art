import { GameObject } from '../../game-engine/game-object'
import Sprite from '../../game-engine/nodes/sprite'
import SpriteTexture from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { suns } from '../../states'
import { drawCharacter } from '../../utilities/characters'
import { GameObjectTypes } from '../../utilities/enums'

function drawNumbers(num: number, transform: Vector2) {
  drawCharacter(num.toString(), transform)
}

export default class SunCounter extends GameObject {
  nodes = [
    new Sprite('/sprites/ui/sun-counter/sun-counter.png', this.transform),
  ]

  numberPos = new Vector2(47, 9)
  slider = new SpriteTexture('/sprites/ui/sun-counter/slider.png')
  constructor() {
    super(GameObjectTypes.UI, new Vector2(36, 4))
  }

  draw() {
    drawNumbers(Math.floor(suns.current / 25), this.numberPos)
    const top = ((suns.current % 25) * 2) / 5
    this.slider.freeDraw(
      0,
      10 - top,
      this.transform.x + 28,
      this.transform.y + 3,
      2,
      top
    )
  }
}
