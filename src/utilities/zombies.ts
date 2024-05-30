import Entity from '../_mods-ge/entity'
import Vector2 from '../game-engine/utilities/vector2'
import { Views } from '../game-engine/lib/loader'
import { GameObjectTypes } from './enums'

export function hasAZombie(x: number, y: number, dx: number, dy: number) {
  for (const zombie of Views.get(GameObjectTypes.ZOMBIE)) {
    if (zombie.collision.invulnerable) continue

    const x1 = x + dx
    const y2 = y + dy

    if (
      zombie.collision.detectCollision(new Vector2(x, y), new Vector2(x1, y2))
    ) {
      return true
    }
  }
  return false
}

export function collideAZombie(x: number, y: number, dx: number, dy: number) {
  for (const zombie of Views.get(GameObjectTypes.ZOMBIE)) {
    if (zombie.collision.invulnerable) continue
    if (!(zombie instanceof Entity)) continue

    const x1 = x + dx
    const y2 = y + dy

    if (
      zombie.collision.detectCollision(new Vector2(x, y), new Vector2(x1, y2))
    ) {
      return zombie
    }
  }
}
