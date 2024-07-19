// import { GameObject, ctx } from '../../game-engine/game-object'
// import PotatoMine from '../../go/plants/potato-mine'
// import Peashooter from '../../go/plants/night/scaredy-shroom'
// import { GameObjectTypes } from '../../utilities/enums'
import Vector2 from '../../game-engine/utilities/vector2'
import Peashooter from '../../go/plants/day/peashooter'
import WallNut from '../../go/plants/day/wall-nut'
import Squash from '../../go/plants/pool/squash'
import Threepeater from '../../go/plants/pool/threepeater'
import Zombie from '../../go/zombies/zombie'
import { suns } from '../../states'
import { PLANTS } from '../../utilities/enums/plants'
import { ZOMBIES } from '../../utilities/enums/zombie'
import Pool from '../on-game/pool'

export default class TestMap extends Pool {
  constructor() {
    super(
      [
        PLANTS.PEASHOOTER,
        PLANTS.SUNFLOWER,
        PLANTS.WALL_NUT,
        PLANTS.LILY_PAD,
        PLANTS.THREEPEATER,
        PLANTS.SQUASH,
      ],
      1,
      [{ porcent: 100, zombie: ZOMBIES.ZOMBIE, wave: 0 }],
      2
    )

    suns.current = 325

    this.gameObjects.push(
      new Zombie(new Vector2(192, 40)),
      new Threepeater(new Vector2(40, 26))
      // new Peashooter(new Vector2(40, 42))
    )
  }
}
