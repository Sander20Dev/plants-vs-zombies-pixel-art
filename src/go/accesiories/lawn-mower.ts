import { GameObject } from '../../game-engine/game-object'
import { canvas } from '../../utilities/drawing'
import Entity from '../../_mods-ge/entity'
import AudioPlayer from '../../game-engine/nodes/audio-player'
import Collision from '../../game-engine/nodes/collider'
import Sprite from '../../game-engine/nodes/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { GameObjectTypes } from '../../utilities/enums'
import Time from '../../game-engine/utilities/time'

export default class LawnMower extends GameObject {
  collision: Collision = new Collision(
    this,
    new Vector2(0, 5),
    new Vector2(14, 11),
    GameObjectTypes.ZOMBIE,
    (zombie) => {
      if (!(zombie instanceof Entity)) return
      zombie.attack(zombie.health + 1)
      if (!this.#run) {
        this.#audioList.lm.play()
        this.#run = true
      }
    },
    { detectInvulnerables: true }
  )

  #audioList = {
    lm: new AudioPlayer('/audios/env/lawnmower.ogg'),
  }

  nodes = [
    new Sprite('/sprites/ui/lawn-mower.png', this.transform, {
      rawCoords: true,
    }),
  ]

  constructor(pos: Vector2) {
    super(GameObjectTypes.PROJECTIL, pos)
  }

  #run = false

  update(): void {
    if (this.#run) this.transform.x += Time.deltaTime * 80

    if (this.transform.x > canvas.width) this.destroy()
  }
}
