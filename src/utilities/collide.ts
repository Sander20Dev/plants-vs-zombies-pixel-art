import { GameObject } from '../game-engine/game-object'
import Vector2 from '../game-engine/utilities/vector2'
import { Views } from '../game-engine/lib/loader'
import { GameObjectTypes } from './enums'

export function getCollide(
  x: number,
  y: number,
  dx: number,
  dy: number,
  filter: GameObjectTypes
) {
  const returns: GameObject[] = []
  for (const object of Views.get(filter)) {
    if (object.collision.invulnerable) continue

    const x1 = x + dx
    const y2 = y + dy

    if (
      object.collision.detectCollision(new Vector2(x, y), new Vector2(x1, y2))
    ) {
      returns.push(object)
    }
  }
  return returns
}
