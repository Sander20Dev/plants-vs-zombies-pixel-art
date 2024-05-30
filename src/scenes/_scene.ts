import type { GameObject } from '../game-engine/game-object'

export default class Scene {
  constructor(public gameObjects: GameObject[]) {}
}
