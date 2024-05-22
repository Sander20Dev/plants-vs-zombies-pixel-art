import Board from '../go/ui/board'
import Seeds from '../go/ui/seeds'
import SunCounter from '../go/ui/sun-counter'
import { PLANTS } from '../utilities/enums/plants'
import SunSpawner from '../classes/controllers/sun-spawner'
import ZombieGenerator from '../classes/controllers/zombie-generator'
import Scene from './_scene'
import Pause from '../go/ui/buttons/pause'

export default class Map1 extends Scene {
  constructor() {
    super([
      new Board(),
      new SunCounter(),
      new Seeds([
        PLANTS.SUNFLOWER,
        PLANTS.PEASHOOTER,
        PLANTS.CHERRY_BOMB,
        PLANTS.WALL_NUT,
        PLANTS.CHOMPER,
        PLANTS.REAPEATER,
        PLANTS.SNOW_PEA,
      ]),
      new SunSpawner(),
      new ZombieGenerator(),
      new Pause(),
    ])
  }
}
