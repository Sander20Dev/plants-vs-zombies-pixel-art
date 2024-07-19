import Vector2 from '../../game-engine/utilities/vector2'
import Zombie from './_zombie'

export default class BackupDancer extends Zombie {
  constructor(pos: Vector2) {
    super(pos, 335, 100)
    this.init()
  }
}
