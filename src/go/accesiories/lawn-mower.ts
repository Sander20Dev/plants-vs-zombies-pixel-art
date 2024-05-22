import { GameObject, canvas } from '../../classes/game-object'
import Entity from '../../classes/game-object/entity'
import AudioPlayer from '../../classes/nodes/audio-player'
import Collision from '../../classes/nodes/collider'
import Sprite from '../../classes/nodes/sprite'
import Vector2 from '../../classes/vector2'
import { GameObjectTypes } from '../../utilities/enums'
import Time from '../../utilities/importants/time'

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
    new Sprite(
      '/sprites/ui/lawn-mower.png',
      this.transform,
      new Vector2(16, 16),
      { rawCoords: true }
    ),
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
