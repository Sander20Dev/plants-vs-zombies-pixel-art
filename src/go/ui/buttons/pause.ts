import Button from '../../../classes/game-objects/button'
import Vector2 from '../../../classes/vector2'
import Input from '../../../utilities/importants/input'
import PauseMenu from '../views/pause-menu'

export default class Pause extends Button {
  pause?: PauseMenu
  constructor() {
    super(new Vector2(174, 4), new Vector2(14, 12), {
      normal: '/sprites/ui/buttons/pause/normal.png',
      active: '/sprites/ui/buttons/pause/active.png',
    })
  }

  priority() {
    if (Input.isKeyDown('Escape')) {
      if (!this.pause) {
        this.pause = new PauseMenu()
        this.pause.onPlay = () => (this.pause = undefined)
      } else {
        this.pause.play()
      }
    }
  }

  onClick(): void {
    if (!this.pause) {
      this.pause = new PauseMenu()
      this.pause.onPlay = () => (this.pause = undefined)
    }
  }
}
