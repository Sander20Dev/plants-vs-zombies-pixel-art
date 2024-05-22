import { suns } from '../states'
import { GameObjectTypes } from '../utilities/enums'
import Time from '../utilities/importants/time'
import { GameObject } from './game-object'
import AudioPlayer from './nodes/audio-player'
import Clickable from './nodes/clickable'
import Sprite from './nodes/sprite'
import Vector2 from './vector2'

const sunCounterPos = new Vector2(40, 8)
export default class Sun extends GameObject {
  #audioList = {
    points: new AudioPlayer('/audios/points.ogg'),
  }

  #clickable
  #scale = new Vector2(8, 8)

  #sprite = new Sprite('/sprites/ui/sun.png', this.transform, this.#scale, {
    rawCoords: true,
  })

  constructor(pos: Vector2) {
    super(GameObjectTypes.SUN, pos)

    const scale = new Vector2(8, 8)

    this.#clickable = new Clickable(this.transform, scale, this.#onClick)

    this.#clickable.onClick = this.#onClick

    this.nodes = [this.#sprite, this.#clickable]
  }

  clicked = false
  #onClick = () => {
    if (!this.clicked) {
      this.#audioList.points.play()
      this.clicked = true
    }
  }

  moveTo(to: Vector2, speed: number) {
    const x = to.x - this.transform.x
    const y = to.y - this.transform.y

    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

    const k = distance / speed

    return new Vector2(x / k, y / k)
  }

  #counterSunTime = 20
  #fadingAnimation = 0
  #orientation = false
  #sunTime() {
    if (this.clicked) return
    if (this.#counterSunTime <= 0) return this.destroy()
    this.#counterSunTime -= Time.deltaTime

    if (this.#counterSunTime < 10) {
      if (this.#fadingAnimation < -1) this.#orientation = true
      if (this.#fadingAnimation > 1) this.#orientation = false

      if (this.#orientation) this.#fadingAnimation += Time.deltaTime
      else this.#fadingAnimation -= Time.deltaTime

      const opacity = (this.#fadingAnimation + 3) * 25

      this.#sprite.filters =
        'opacity(' + (opacity < 50 ? 50 : opacity > 100 ? 100 : opacity) + '%)'
    }
  }

  update(): void {
    if (this.clicked) {
      const m = this.moveTo(sunCounterPos, 200)

      this.transform.x += m.x * Time.deltaTime
      this.transform.y += m.y * Time.deltaTime

      if (
        (this.transform.roundedX >= sunCounterPos.roundedX &&
          this.transform.roundedY >= sunCounterPos.roundedY &&
          this.transform.roundedX <= sunCounterPos.roundedX + 8 &&
          this.transform.roundedY <= sunCounterPos.roundedY + 8) ||
        this.transform.x < 0 ||
        this.transform.y < 0
      ) {
        suns.current += 2

        this.destroy()
      }
    }
    this.#sunTime()
  }
}
