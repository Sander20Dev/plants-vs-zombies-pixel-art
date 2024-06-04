// import { GameObject, ctx } from '../../game-engine/game-object'
import Vector2 from '../../game-engine/utilities/vector2'
// import PotatoMine from '../../go/plants/potato-mine'
import Peashooter from '../../go/plants/night/ice-shroom'
// import WallNut from '../../go/plants/wall-nut'
import Zombie from '../../go/zombies/zombie'
import { suns } from '../../states'
// import { GameObjectTypes } from '../../utilities/enums'
import { PLANTS, loadingSeeds } from '../../utilities/enums/plants'
import { ZOMBIES } from '../../utilities/enums/zombie'
import Night from '../on-game/night'

export default class TestMap extends Night {
  constructor() {
    super(
      [
        PLANTS.PUFF_SHROOM,
        PLANTS.SUN_SHROOM,
        PLANTS.FUME_SHROOM,
        PLANTS.GRAVE_BUSTER,
        PLANTS.IMPACT_SHROOM,
        PLANTS.ICE_SHROOM,
      ],
      1,
      [{ porcent: 100, zombie: ZOMBIES.ZOMBIE, wave: 0 }],
      2
    )
    suns.current = 100
    loadingSeeds.current[PLANTS.ICE_SHROOM].current =
      loadingSeeds.current[PLANTS.ICE_SHROOM].timeout

    this.gameObjects.push(
      new Peashooter(new Vector2(136, 40)),
      // new WallNut(new Vector2(136, 40)),
      // new PotatoMine(new Vector2(152, 40)),
      new Zombie(new Vector2(168, 40))
      // new Zombie(new Vector2(192, 40))
      // new Square(new Vector2(128, 40), new Vector2(24, 16))
    )
  }
}
