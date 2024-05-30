import PlayButton from '../go/lobby/play-button'
import { GameObjectTypes } from '../utilities/enums'
import { GameObject } from '../game-engine/game-object'
import Sprite from '../game-engine/nodes/sprite'
import Vector2 from '../game-engine/utilities/vector2'
import Scene from './_scene'

export default class Lobby extends Scene {
  constructor() {
    super([new Background(), new PlayButton()])
  }
}

class Background extends GameObject {
  nodes = [new Sprite('/sprites/ui/lobby/bg.png', this.transform)]
  constructor() {
    super(GameObjectTypes.BACKGROUND, Vector2.ZERO)
  }
}
