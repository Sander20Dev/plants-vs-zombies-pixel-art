import Entity from '../../_mods-ge/entity'
import Vector2 from '../../game-engine/utilities/vector2'
import { GameObjectTypes } from '../../utilities/enums'
import { PLANTS, plantsInfo } from '../../utilities/enums/plants'

export default class Plant extends Entity {
  isLarge = false

  constructor(pos: Vector2, plant: PLANTS) {
    super(
      GameObjectTypes.PLANT,
      pos,
      plantsInfo[plant].health,
      plantsInfo[plant].damage
    )
  }
}
