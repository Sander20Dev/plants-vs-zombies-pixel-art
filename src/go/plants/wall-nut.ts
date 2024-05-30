import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import Collision from '../../game-engine/nodes/collider'
import SpriteTexture from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { PLANTS } from '../../utilities/enums/plants'
import Plant from './plant'

const wallNutAnimation = {
  '1': {
    sprites: [
      ...Array(9).fill(
        new SpriteTexture('/sprites/plants/wall-nut/1-idle1.png')
      ),
      new SpriteTexture('/sprites/plants/wall-nut/1-idle2.png'),
    ],
    fps: 5,
  },
  '2': {
    sprites: [
      ...Array(9).fill(
        new SpriteTexture('/sprites/plants/wall-nut/2-idle1.png')
      ),
      new SpriteTexture('/sprites/plants/wall-nut/2-idle2.png'),
    ],
    fps: 5,
  },
  '3': {
    sprites: [
      ...Array(9).fill(
        new SpriteTexture('/sprites/plants/wall-nut/3-idle1.png')
      ),
      new SpriteTexture('/sprites/plants/wall-nut/3-idle2.png'),
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
