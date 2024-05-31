import { GameObject } from '../../../game-engine/game-object'
import { SpritesList } from '../../../game-engine/nodes/animated-sprites-list'
import AudioPlayer from '../../../game-engine/nodes/audio-player'
import Clickable from '../../../game-engine/nodes/clickable'
import SpriteTexture from '../../../game-engine/utilities/sprite'
import Vector2 from '../../../game-engine/utilities/vector2'
import { selectedPlant } from '../../../states'
import { GameObjectTypes } from '../../../utilities/enums'

export default class Shovel extends GameObject {
  #spritesList = new SpritesList(
    this.transform,
    {
      normal: new SpriteTexture('/sprites/ui/shovel/normal.png'),
      active: new SpriteTexture('/sprites/ui/shovel/active.png'),
      disabled: new SpriteTexture('/sprites/ui/shovel/active.png'),
    },
    'disabled'
  )

  #audioList = {
    click: new AudioPlayer('/audios/effect/click-shovel.ogg'),
  }

  nodes = [
    new Clickable(this.transform, new Vector2(24, 16), () => {
      if (this.#spritesList.currentAnimationName === 'disabled') return

      if (this.#spritesList.currentAnimationName === 'normal') {
        selectedPlant.current = 'SHOVEL'
      } else {
        selectedPlant.current = null
      }
      this.#audioList.click.play()
    }),
    this.#spritesList,
  ]

  constructor(pos: Vector2) {
    super(GameObjectTypes.UI, pos)
  }

  active() {
    this.#spritesList.setCurrentAnimation('normal')
  }

  update(): void {
    if (this.#spritesList.currentAnimationName === 'disabled') return

    if (selectedPlant.current === 'SHOVEL') {
      this.#spritesList.setCurrentAnimation('active')
    } else {
      this.#spritesList.setCurrentAnimation('normal')
    }
  }
}
