// import { GameObject, ctx } from '../../classes/game-object'
import Vector2 from '../../classes/vector2'
import PotatoMine from '../../go/plants/potato-mine'
import Peashooter from '../../go/plants/repeater'
import WallNut from '../../go/plants/wall-nut'
import Zombie from '../../go/zombies/pole-vaulting-zombie'
import { suns } from '../../states'
// import { GameObjectTypes } from '../../utilities/enums'
import { PLANTS } from '../../utilities/enums/plants'
import { ZOMBIES } from '../../utilities/enums/zombie'
import DayMap from '../adventure-mode/day/_day'

export default class TestMap extends DayMap {
  constructor() {
    suns.current = 8
    super(
      [PLANTS.CHOMPER],
      5,
      1,
      [{ porcent: 100, zombie: ZOMBIES.ZOMBIE, wave: 0 }],
      2
    )
    this.gameObjects.push(
      new Peashooter(new Vector2(120, 40)),
      new WallNut(new Vector2(136, 40)),
      new PotatoMine(new Vector2(152, 40)),
      new Zombie(new Vector2(192, 40))
      // new Square(new Vector2(128, 40), new Vector2(24, 16))
    )
  }
}

// class Square extends GameObject {
//   constructor(pos: Vector2, public scale: Vector2) {
//     super(GameObjectTypes.ANIMATION, pos)
//   }

//   draw(): void {
//     ctx.fillStyle = '#0068'
//     ctx.fillRect(
//       this.transform.roundedX,
//       this.transform.roundedY,
//       this.scale.x,
//       this.scale.y
//     )
//   }
// }
