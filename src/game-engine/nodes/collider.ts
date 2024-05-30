import { Views } from '../lib/loader'
import { GameObjectTypes } from '../../utilities/enums'
import { GameObject } from '../game-object'
import Vector2 from '../utilities/vector2'
import NodeAbs from './node'

export default class Collision extends NodeAbs {
  ignore = false
  invulnerable = false

  options

  constructor(
    private gameObj: GameObject,
    public transform: Vector2,
    public scale: Vector2,
    public mesh?: GameObjectTypes,
    onCollision?: (obj: GameObject) => void,
    { detectInvulnerables = false } = {}
  ) {
    super()
    this.options = { detectInvulnerables }
    if (onCollision != null) {
      this.onCollision = function (obj) {
        onCollision(obj)
      }
    }
  }

  get relativeTransform() {
    return this.gameObj.transform.add(this.transform)
  }

  #detection(from1: Vector2, to1: Vector2, from2: Vector2, to2: Vector2) {
    return (
      from1.x < to2.x && to1.x > from2.x && from1.y < to2.y && to1.y > from2.y
    )
  }

  detectCollision(from: Vector2, to: Vector2) {
    const collided = this.#detection(
      this.relativeTransform,
      this.relativeTransform.add(this.scale),
      from,
      to
    )

    return collided
    /*  ||
      this.#detection(
        from,
        to,
        this.relativeTransform,
        this.relativeTransform.add(this.scale)
      ) */
  }

  onCollision(obj: GameObject): void
  onCollision() {}
  onUpdate(obj?: GameObject): void
  onUpdate() {}

  update() {
    if (this.mesh != null) {
      const filteredMesh = Views.get(this.mesh)

      if (filteredMesh.length === 0) this.onUpdate()

      for (let i = 0; i < filteredMesh.length; i++) {
        const obj = filteredMesh[i]

        if (!this.options.detectInvulnerables && obj.collision.invulnerable)
          continue

        const collided = this.detectCollision(
          obj.collision.relativeTransform,
          obj.collision.relativeTransform.add(obj.collision.scale)
        )

        if (collided) {
          this.onUpdate(obj)
          this.onCollision(obj)
          break
        }

        if (i + 1 === filteredMesh.length) {
          this.onUpdate()
        }
      }
    }
  }
}
