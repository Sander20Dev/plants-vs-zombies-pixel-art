import { Views } from './lib/loader'
import { GameObjectTypes } from '../utilities/enums'
import Collision from './nodes/collider'
import NodeAbs from './nodes/node'
import Vector2 from './utilities/vector2'

export const canvas = document.querySelector('canvas')!
export const ctx = canvas.getContext('2d')!

export abstract class GameObject {
  localTimeRate = 1

  hide = false
  transform = Vector2.ZERO
  collision = new Collision(this, Vector2.ZERO, Vector2.ZERO)

  orderIndex: number
  zIndex: number

  nodes: NodeAbs[] = []

  constructor(public type: GameObjectTypes, pos: Vector2, zIndex?: number) {
    this.orderIndex = Views.instanceObject(this)
    this.transform = pos
    this.zIndex = zIndex ?? 0
  }

  getComponent<T extends typeof NodeAbs>(type: T) {
    for (const node of this.nodes) {
      if (node instanceof type) return node as T['prototype']
    }
    return null
  }

  nodesUpdate(nodeUpdate: (tr?: number) => void) {
    nodeUpdate()
  }

  draw() {}
  update() {}
  priority() {}

  onDestroy() {}

  destroy() {
    this.onDestroy()

    for (const node of this.nodes) {
      node.destroy()
    }
    this.hide = true

    Views.destroyObject(this)
  }
}
