import { Views } from './lib/loader'
import { GameObjectTypes } from '../utilities/enums'
import Collision from './nodes/collider'
import NodeAbs from './nodes/node'
import Vector2 from './utilities/vector2'

export const canvas = document.querySelector('canvas')!
canvas.width = 1920
canvas.height = 1120

export const ctx = canvas.getContext('2d')!
ctx.imageSmoothingEnabled = false

export interface IGOOptions {
  zIndex?: number
}

interface GOEvents {
  update(delta: number): void
  destroy(): void
}

export abstract class GameObject {
  localTimeRate = 1

  hide = false
  transform = Vector2.ZERO
  collision = new Collision(this, Vector2.ZERO, Vector2.ZERO)

  zIndex: number = 0

  nodes: NodeAbs[] = []

  events: { [P in keyof GOEvents]: GOEvents[P][] } = {
    update: [],
    destroy: [],
  }

  constructor(
    public type: GameObjectTypes,
    pos: Vector2,
    options?: IGOOptions
  ) {
    this.transform = pos
    if (options?.zIndex) {
      this.zIndex = options.zIndex
    }
    Views.instanceObject(this)
  }

  addEventListener<T extends keyof GOEvents>(event: T, cb: GOEvents[T]) {
    this.events[event].push(cb)
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
    this.events.destroy.forEach((cb) => cb())

    for (const node of this.nodes) {
      node.destroy()
    }
    this.hide = true

    Views.destroyObject(this)
  }
}
