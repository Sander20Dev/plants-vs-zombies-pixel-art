import AnimatedSpritesList from '../../classes/nodes/animated-sprites-list'
import Collision from '../../classes/nodes/collider'
import Vector2 from '../../classes/vector2'
import { PLANTS } from '../../utilities/enums/plants'
import Plant from './plant'

const wallNutAnimation = {
  '1': {
    srcs: [
      ...Array<string>(9).fill('/sprites/plants/wall-nut/1-idle1.png'),
      '/sprites/plants/wall-nut/1-idle2.png',
    ],
    fps: 5,
  },
  '2': {
    srcs: [
      ...Array<string>(9).fill('/sprites/plants/wall-nut/2-idle1.png'),
      '/sprites/plants/wall-nut/2-idle2.png',
    ],
    fps: 5,
  },
  '3': {
    srcs: [
      ...Array<string>(9).fill('/sprites/plants/wall-nut/3-idle1.png'),
      '/sprites/plants/wall-nut/3-idle2.png',
    ],
    fps: 5,
  },
}

export default class WallNut extends Plant {
  collision: Collision = new Collision(
    this,
    new Vector2(6, 10),
    new Vector2(6, 5)
  )

  #animationList = new AnimatedSpritesList(
    this.transform,
    new Vector2(16, 16),
    wallNutAnimation,
    '1'
  )
  nodes = [this.#animationList]

  constructor(pos: Vector2) {
    super(pos, PLANTS.WALL_NUT)
  }

  update() {
    if (this.health < 1000) {
      this.#animationList.setCurrentAnimation('3')
    } else if (this.health < 2500) {
      this.#animationList.setCurrentAnimation('2')
    } else {
      this.#animationList.setCurrentAnimation('1')
    }
  }
}
