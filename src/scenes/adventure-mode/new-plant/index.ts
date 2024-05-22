import { GameObject, ctx } from '../../../classes/game-object'
import Clickable from '../../../classes/nodes/clickable'
import Sprite from '../../../classes/nodes/sprite'
import Vector2 from '../../../classes/vector2'
import { images } from '../../../go/ui/seeds'
import { scenes } from '../../../manager/scenes-manager'
import { GameObjectTypes } from '../../../utilities/enums'
import { PLANTS } from '../../../utilities/enums/plants'
import Scene from '../../_scene'
import Lobby from '../../lobby'

export default class NewPlantScene extends Scene {
  constructor(plant: PLANTS) {
    super([new Bg(plant)])
  }
}

class Bg extends GameObject {
  img

  constructor(plant: PLANTS) {
    super(GameObjectTypes.BACKGROUND, Vector2.ZERO)
    this.nodes = [
      new Sprite(
        '/sprites/ui/views/new-plant.png',
        this.transform,
        Vector2.ZERO
      ),
      new Clickable(new Vector2(50, 96), new Vector2(88, 14), () =>
        scenes.changeScene(Lobby)
      ),
    ]
    this.img = images.find(({ plant: p }) => p === plant)!.img
  }

  draw(): void {
    ctx.filter = 'pixelated'
    ctx.drawImage(this.img, 82, 36)
  }
}
