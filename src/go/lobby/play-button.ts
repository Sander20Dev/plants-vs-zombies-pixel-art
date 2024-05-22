import Button from '../../classes/game-objects/button'
import Vector2 from '../../classes/vector2'
import { scenes } from '../../manager/scenes-manager'
import SelectDifficulty from '../../scenes/new-game/select-difficulty'
// import Day1 from '../../scenes/adventure-mode/day/day-1'

export default class PlayButton extends Button {
  constructor() {
    super(new Vector2(140, 32), new Vector2(48, 24), {
      normal: '/sprites/ui/lobby/buttons/adventure/normal.png',
      active: '/sprites/ui/lobby/buttons/adventure/active.png',
    })
  }

  onClick(): void {
    scenes.changeScene(SelectDifficulty)
  }
}
