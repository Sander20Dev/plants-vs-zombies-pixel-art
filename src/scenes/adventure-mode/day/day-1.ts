import { PLANTS } from '../../../utilities/enums/plants'
import { ZOMBIES } from '../../../utilities/enums/zombie'
import DayMap from './_day'

export default class Day1 extends DayMap {
  constructor() {
    super(
      [PLANTS.PEASHOOTER],
      5,
      2,
      [{ porcent: 100, zombie: ZOMBIES.POLE_VAULTING_ZOMBIE, wave: 0 }],
      undefined,
      0
    )
  }
}
