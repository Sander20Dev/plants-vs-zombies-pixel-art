import Vector2 from '../../classes/vector2'
import Zombie from './_zombie'

export const ZOMBIE_SPEED = 4

export default class NormalZombie extends Zombie {
  constructor(pos: Vector2) {
    super(pos, 181)
  }

  // setAnimation() {
  //   if (this.health > 90) {
  //     this.animationList.setCurrentAnimation('z-normal')
  //     return
  //   }

  //   this.animationList.setCurrentAnimation('z-arm')
  // }
}
