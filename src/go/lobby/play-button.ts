import Button from '../../_mods-ge/button'
import SpriteTexture from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { scenes } from '../../manager/scenes-manager'
import SelectDifficulty from '../../scenes/new-game/select-difficulty'
// import Day1 from '../../scenes/adventure-mode/day/day-1'

export default class PlayButton extends Button {
  constructor() {
    super(new Vector2(140, 32), new Vector2(48, 24), {
      normal: new SpriteTexture(
        '/sprites/ui/lobby/buttons/adventure/normal.png'
      ),
      active: new SpriteTexture(
        '/sprites/ui/lobby/buttons/adventure/active.png'
      ),
    })
  }

  onClick(): void {
    scenes.changeScene(SelectDifficulty)
  }
}
