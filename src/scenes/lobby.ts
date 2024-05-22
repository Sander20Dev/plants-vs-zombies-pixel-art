import PlayButton from '../go/lobby/play-button'
import { GameObjectTypes } from '../utilities/enums'
import { GameObject } from '../classes/game-object'
import Sprite from '../classes/nodes/sprite'
import Vector2 from '../classes/vector2'
import Scene from './_scene'

export default class Lobby extends Scene {
  constructor() {
    super([new Background(), new PlayButton()])
  }
}

class Background extends GameObject {
  nodes = [
    new Sprite('/sprites/ui/lobby/bg.png', this.transform, Vector2.SCREEN),
  ]
  constructor() {
    super(GameObjectTypes.BACKGROUND, Vector2.ZERO)
  }
}
