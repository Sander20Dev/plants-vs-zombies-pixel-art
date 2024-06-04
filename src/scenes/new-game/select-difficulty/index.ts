import Button from '../../../_mods-ge/button'
import SpriteTexture from '../../../game-engine/utilities/sprite'
import Vector2 from '../../../game-engine/utilities/vector2'
import { scenes } from '../../../manager/scenes-manager'
import Background from '../../../ui/utils/background'
import Scene from '../../_scene'
import { DIFFICULTY } from '../../../utilities/enums/difficulty'
import SelectPlants from '../select-plants'

export default class SelectDifficulty extends Scene {
  constructor() {
    const handleClick = (d: DIFFICULTY) =>
      scenes.changeScene(SelectPlants as unknown as typeof Scene, [d])

    const easy = new Button(new Vector2(16, 54), new Vector2(52, 32), {
      normal: new SpriteTexture(
        '/sprites/ui/views/new-game/select-difficulty/easy-button.png'
      ),
    })
    easy.onClick = () => handleClick(DIFFICULTY.EASY)

    const normal = new Button(new Vector2(70, 54), new Vector2(52, 32), {
      normal: new SpriteTexture(
        '/sprites/ui/views/new-game/select-difficulty/normal-button.png'
      ),
    })
    normal.onClick = () => handleClick(DIFFICULTY.NORMAL)

    const hard = new Button(new Vector2(124, 54), new Vector2(52, 32), {
      normal: new SpriteTexture(
        '/sprites/ui/views/new-game/select-difficulty/hard-button.png'
      ),
    })
    hard.onClick = () => handleClick(DIFFICULTY.HARD)

    super([
      new Background(
        new SpriteTexture(
          '/sprites/ui/views/new-game/select-difficulty/select-difficulty.png'
        )
      ),
      easy,
      normal,
      hard,
    ])
  }
}
