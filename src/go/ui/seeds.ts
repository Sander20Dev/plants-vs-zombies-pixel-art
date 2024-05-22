import { GameObject, ctx } from '../../classes/game-object'
import AudioPlayer from '../../classes/nodes/audio-player'
import Clickable from '../../classes/nodes/clickable'
import Vector2 from '../../classes/vector2'
import { selectedPlant, suns } from '../../states'
import { GameObjectTypes } from '../../utilities/enums'
import {
  PLANTS,
  allPlants,
  loadingSeeds,
  plantsInfo,
} from '../../utilities/enums/plants'
import Time from '../../utilities/importants/time'
import { getImage } from '../../utilities/media-storage'

export const images = allPlants.map((plant) => {
  return { img: getImage('/sprites/ui/seeds/' + plant + '.png', 24, 16), plant }
})

export default class Seeds extends GameObject {
  audioList = {
    grasswalk: new AudioPlayer('/audios/music/grasswalk.mp3', { loop: true }),
    ready: new AudioPlayer('/audios/effect/readysetplant.ogg'),
  }

  nodes = [
    new Clickable(this.transform, new Vector2(24, 96), (mousePos) => {
      const x = Math.floor((mousePos.x - this.transform.x) / 24)
      const y = Math.floor((mousePos.y - this.transform.y) / 16)

      if (x !== 0 || y < 0 || y >= this.seeds.length) return

      if (selectedPlant.current === this.seeds[y]) {
        selectedPlant.current = null
        return
      }
      if (
        suns.current < plantsInfo[this.seeds[y]].price ||
        loadingSeeds[this.seeds[y]].current <
          loadingSeeds[this.seeds[y]].timeout
      )
        return

      selectedPlant.current = this.seeds[y]
    }),
  ]

  seeds: PLANTS[]

  constructor(seeds: PLANTS[]) {
    super(GameObjectTypes.UI, new Vector2(8, 8))
    this.seeds = seeds.slice(0, 6)
    this.audioList.ready.play()
  }

  #init = 0
  #started = false

  draw() {
    for (let i = 0; i < this.seeds.length; i++) {
      const plant = this.seeds[i]
      const timer = loadingSeeds[plant]

      if (plant === selectedPlant.current) {
        ctx.beginPath()
        ctx.fillStyle = '#3CA370'
        ctx.fillRect(
          this.transform.x + 2,
          this.transform.y + i * 16 + 1,
          20,
          15
        )
        ctx.closePath()
      }

      const img = images.find(({ plant: p }) => p === plant) ?? images[0]

      if (timer.current < timer.timeout) {
        const difference = Math.round((16 * timer.current) / timer.timeout)
        ctx.filter = 'grayscale(100%) brightness(30%)'
        ctx.drawImage(
          img.img,
          0,
          0,
          24,
          16 - difference,
          this.transform.x,
          this.transform.y + i * 16,
          24,
          16 - difference
        )
        ctx.filter = 'grayscale(100%) brightness(40%)'
        ctx.drawImage(
          img.img,
          0,
          16 - difference,
          24,
          difference,
          this.transform.x,
          this.transform.y + i * 16 + 16 - difference,
          24,
          difference
        )
        ctx.filter = 'none'
      } else if (suns.current < plantsInfo[plant].price) {
        const difference = Math.round(
          (16 * suns.current) / plantsInfo[plant].price
        )
        ctx.filter = 'grayscale(100%) brightness(50%)'
        ctx.drawImage(
          img.img,
          0,
          0,
          24,
          16 - difference,
          this.transform.x,
          this.transform.y + i * 16,
          24,
          16 - difference
        )
        ctx.filter = 'grayscale(50%) brightness(80%)'
        ctx.drawImage(
          img.img,
          0,
          16 - difference,
          24,
          difference,
          this.transform.x,
          this.transform.y + i * 16 + 16 - difference,
          24,
          difference
        )
      } else {
        ctx.filter = 'none'
        ctx.drawImage(img.img, this.transform.x, this.transform.y + i * 16)
      }
    }
  }

  update() {
    if (this.#init < 3) {
      this.#init += Time.deltaTime
    } else if (!this.#started) {
      this.audioList.grasswalk.play()
      this.#started = true
    }

    for (let i = 0; i < this.seeds.length; i++) {
      const plant = this.seeds[i]
      if (this.#started) loadingSeeds[plant].current += Time.deltaTime
    }
  }
}
