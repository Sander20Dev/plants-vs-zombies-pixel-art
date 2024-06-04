import { GameObject } from '../game-object'
import { GameObjectTypes } from '../../utilities/enums'

const gameObjects: Record<GameObjectTypes, GameObject[]> = {
  [GameObjectTypes.BACKGROUND]: [],
  [GameObjectTypes.PLANT]: [],
  [GameObjectTypes.ZOMBIE]: [],
  [GameObjectTypes.ANIMATION]: [],
  [GameObjectTypes.PROJECTIL]: [],
  [GameObjectTypes.SUN]: [],
  [GameObjectTypes.UI]: [],
}

export class Views {
  static get(type: GameObjectTypes) {
    return gameObjects[type]
  }
  static getAll(type: GameObjectTypes[]) {
    const all = type.map((t) => Views.get(t))
    const a: GameObject[] = []
    for (let i = 0; i < all.length; i++) {
      for (let j = 0; j < all[i].length; j++) {
        a.push(all[i][j])
      }
    }
    return a
  }

  static destroyObject(gb: GameObject) {
    const index = Views.get(gb.type).indexOf(gb)
    if (index < 0) return

    Views.get(gb.type).splice(index, 1)
  }

  static clean() {
    for (const gb of this.all()) {
      gb.destroy()
    }

    for (const key of Object.keys(gameObjects)) {
      gameObjects[+key as GameObjectTypes] = []
    }
  }

  static instanceObject(gb: GameObject) {
    gameObjects[gb.type].push(gb)

    gameObjects[gb.type].sort((a, b) => {
      if (a.zIndex !== b.zIndex) return a.orderIndex - b.orderIndex
      return a.zIndex - b.zIndex
    })

    return gameObjects[gb.type].indexOf(gb)
  }

  static all() {
    return [
      ...gameObjects[GameObjectTypes.BACKGROUND],
      ...gameObjects[GameObjectTypes.PLANT],
      ...gameObjects[GameObjectTypes.ZOMBIE],
      ...gameObjects[GameObjectTypes.ANIMATION],
      ...gameObjects[GameObjectTypes.PROJECTIL],
      ...gameObjects[GameObjectTypes.SUN],
      ...gameObjects[GameObjectTypes.UI],
    ]
  }
}
