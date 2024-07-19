import { GameObject } from '../game-object'
import { GameObjectTypes } from '../../utilities/enums'

const gameObjectsByZIndex: Record<GameObjectTypes, GameObject[][]> = {
  [GameObjectTypes.BACKGROUND]: [],
  [GameObjectTypes.PLANT]: [],
  [GameObjectTypes.ZOMBIE]: [],
  [GameObjectTypes.ANIMATION]: [],
  [GameObjectTypes.PROJECTIL]: [],
  [GameObjectTypes.SUN]: [],
  [GameObjectTypes.UI]: [],
}
// const gameObjects: Record<GameObjectTypes, GameObject[]> = {
//   [GameObjectTypes.BACKGROUND]: [],
//   [GameObjectTypes.PLANT]: [],
//   [GameObjectTypes.ZOMBIE]: [],
//   [GameObjectTypes.ANIMATION]: [],
//   [GameObjectTypes.PROJECTIL]: [],
//   [GameObjectTypes.SUN]: [],
//   [GameObjectTypes.UI]: [],
// }

export class Views {
  static get(type: GameObjectTypes) {
    // return gameObjects[type]
    return gameObjectsByZIndex[type].flat()
  }
  static getAll(type: GameObjectTypes[]) {
    // const all = type.map((t) => Views.get(t))
    // const a: GameObject[] = []
    // for (let i = 0; i < all.length; i++) {
    //   for (let j = 0; j < all[i].length; j++) {
    //     a.push(all[i][j])
    //   }
    // }
    // return a
    const all = type.flatMap((t) => gameObjectsByZIndex[t].flat())
    return all
  }

  static destroyObject(gb: GameObject) {
    const zIndex = gb.zIndex
    const type = gb.type

    const index = gameObjectsByZIndex[type][zIndex].indexOf(gb)

    if (index < 0) return

    gameObjectsByZIndex[type][zIndex].splice(index, 1)
  }

  static clean() {
    for (const gb of this.all()) {
      gb.destroy()
    }

    for (const key of Object.keys(gameObjectsByZIndex)) {
      gameObjectsByZIndex[+key as GameObjectTypes] = []
    }
  }

  static instanceObject(gb: GameObject) {
    if (gameObjectsByZIndex[gb.type][gb.zIndex] == null) {
      gameObjectsByZIndex[gb.type][gb.zIndex] = []
    }
    gameObjectsByZIndex[gb.type][gb.zIndex].push(gb)
  }

  static all() {
    const type = [
      GameObjectTypes.BACKGROUND,
      GameObjectTypes.PLANT,
      GameObjectTypes.ZOMBIE,
      GameObjectTypes.ANIMATION,
      GameObjectTypes.PROJECTIL,
      GameObjectTypes.SUN,
      GameObjectTypes.UI,
    ]

    return Views.getAll(type)
  }
}
