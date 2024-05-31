import { GameObject, ctx } from '../../game-engine/game-object'
import AudioPlayer from '../../game-engine/nodes/audio-player'
import Clickable from '../../game-engine/nodes/clickable'
import Vector2 from '../../game-engine/utilities/vector2'
import { selectedPlant, suns } from '../../states'
import { GameObjectTypes } from '../../utilities/enums'
import {
  PLANTS,
  allPlants,
  loadingSeeds,
  plantsInfo,
} from '../../utilities/enums/plants'
import Time from '../../game-engine/utilities/time'
import { getImage } from '../../game-engine/utilities/media-manager/media-storage'
import { Theme } from '../../utilities/enums/theme'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import Shovel from './buttons/shovel'

export const images = allPlants.map((plant) => {
  return { img: getImage('/sprites/ui/seeds/' + plant + '.png'), plant }
})

const readysetplant = importSpriteSheet(
  '/sprites/ui/views/ready/counter.png',
  new Vector2(192, 112),
  4
)

export default class Seeds extends GameObject {
  audioList

  nodes = [
    new Clickable(this.transform, new Vector2(24, 96), (mousePos) => {
      if (!this.#started) return

      const x = Math.floor((mousePos.x - this.transform.x) / 24)
      const y = Math.floor((mousePos.y - this.transform.y) / 16)

      if (x !== 0 || y < 0 || y >= this.seeds.length) return

      if (selectedPlant.current === this.seeds[y]) {
        selectedPlant.current = null
        return
      }
      if (
        suns.current < plantsInfo[this.seeds[y]].price ||
        loadingSeeds.current[this.seeds[y]].current <
          loadingSeeds.current[this.seeds[y]].timeout
      )
        return

      selectedPlant.current = this.seeds[y]
    }),
  ]

  seeds: PLANTS[]

  constructor(seeds: PLANTS[], theme: Theme) {
    super(GameObjectTypes.UI, new Vector2(8, 8))

    this.audioList = {
      musicTheme: new AudioPlayer(
        theme === Theme.DAY
          ? '/audios/music/grasswalk.mp3'
          : '/audios/music/night-theme.ogg',
        { loop: true }
      ),
      ready: new AudioPlayer('/audios/effect/readysetplant.ogg'),
    }

    this.seeds = seeds.slice(0, 6)
    this.audioList.ready.audio.play().then(() => {
      this.#initCounter = true
    })
  }

  #shovel = new Shovel(new Vector2(72, 4))

  #initCounter = false
  #init = 0
  #started = false

  draw() {
    for (let i = 0; i < this.seeds.length; i++) {
      const plant = this.seeds[i]
      const timer = loadingSeeds.current[plant]

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

      if (!this.#started) {
        ctx.filter = 'grayscale(75%) brightness(75%)'
        ctx.drawImage(img.img, this.transform.x, this.transform.y + i * 16)
      } else if (timer.current < timer.timeout) {
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
    if (!this.#initCounter) return

    if (!this.#started) {
      this.#init += Time.deltaTime
      if (this.#init >= 3) {
        this.audioList.musicTheme.play()
        this.#started = true
        this.#shovel.active()
      } else if (this.#init >= 2.3) {
        readysetplant[3].draw(0, 0)
      } else if (this.#init >= 1.65) {
        readysetplant[2].draw(0, 0)
      } else if (this.#init >= 1) {
        readysetplant[1].draw(0, 0)
      } else if (this.#init >= 0.35) {
        readysetplant[0].draw(0, 0)
      }
    }

    for (let i = 0; i < this.seeds.length; i++) {
      const plant = this.seeds[i]
      if (this.#started) loadingSeeds.current[plant].current += Time.deltaTime
    }
  }
}
