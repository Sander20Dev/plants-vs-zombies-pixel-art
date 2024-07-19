import AnimatedSprite from '../../../game-engine/nodes/animated-sprite'
import AudioPlayer from '../../../game-engine/nodes/audio-player'
import Collision from '../../../game-engine/nodes/collider'
import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import Time from '../../../game-engine/utilities/time'
import Vector2 from '../../../game-engine/utilities/vector2'
import { Counter } from '../../../utilities/delta'
import { PLANTS } from '../../../utilities/enums/plants'
import Plant from '../plant'

const eating = importSpriteSheet(
  '/sprites/plants/night/grave-buster/eating.png',
  new Vector2(16),
  3
)

export default class GraveBuster extends Plant {
  audio = new AudioPlayer('/audios/effect/grave-buster-chomp.ogg')
  animation = new AnimatedSprite(
    this.transform.add(new Vector2(0, -3)),
    eating,
    5
  )

  collision: Collision = new Collision(
    this,
    new Vector2(2, 3),
    new Vector2(11, 13)
  )

  audiosEnd = new Counter(4, () => {
    this.destroy()
  })

  constructor(pos: Vector2, zIndex: number = 0) {
    super(pos, PLANTS.GRAVE_BUSTER)
    this.audio.play()
    this.animation.play()
    this.audiosEnd.play()

    this.nodes.push(this.animation)
  }

  update(): void {
    this.audiosEnd.updater()

    if (this.animation.transform.y < this.transform.y) {
      this.animation.transform.y += Time.deltaTime / 2
    } else if (this.animation.transform.y > this.transform.y) {
      this.animation.transform.y = this.transform.y
    }
  }
}
