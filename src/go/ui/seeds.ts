import { GameObject, ctx } from '../../game-engine/game-object'
import AudioPlayer from '../../game-engine/nodes/audio-player'
import Clickable from '../../game-engine/nodes/clickable'
import Vector2 from '../../game-engine/utilities/vector2'
import { currentTheme, selectedPlant, suns } from '../../states'
import { GameObjectTypes } from '../../utilities/enums'
import {
  PLANTS,
  allPlants,
  loadingSeeds,
  plantsInfo,
} from '../../utilities/enums/plants'
import Time from '../../game-engine/utilities/time'
import { Theme } from '../../utilities/enums/theme'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import Shovel from './buttons/shovel'

const spritePlants = importSpriteSheet(
  '/sprites/ui/seeds/seeds-pack.png',
  new Vector2(24, 16),
  8,
  3
)

export const images = allPlants.map((plant, i) => {
  return { img: spritePlants[i], plant }
})

const readysetplant = importSpriteSheet(
  '/sprites/ui/views/ready/counter.png',
  new Vector2(192, 112),
  4
)

export default class Seeds extends GameObject {
  audioList

  seeds: PLANTS[]
  selectedSeeds

  constructor(seeds: PLANTS[]) {
    super(GameObjectTypes.UI, new Vector2(8, 8))

    this.audioList = {
      musicTheme: new AudioPlayer(
        currentTheme.current === Theme.DAY
          ? '/audios/music/grasswalk.mp3'
          : '/audios/music/night-theme.ogg',
        { loop: true }
      ),
      ready: new AudioPlayer('/audios/effect/readysetplant.ogg'),
    }

    this.seeds = seeds.slice(0, 6)
    this.audioList.ready.play().then(() => {
      this.#initCounter = true
    })

    this.selectedSeeds = this.seeds.map((plant, i) => {
      return new Seed(this.transform.add(new Vector2(0, i * 16)), plant)
    })
  }

  #shovel = new Shovel(new Vector2(72, 4))

  #initCounter = false
  #init = 0
  #started = false

  draw() {
    if (!this.#initCounter) return

    if (!this.#started) {
      this.#init += Time.deltaTime
      if (this.#init >= 3) {
        this.audioList.musicTheme.play()
        this.#started = true
        this.selectedSeeds.forEach((seed) => seed.start())

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
  }

  update() {
    if (!this.#initCounter) return

    for (let i = 0; i < this.seeds.length; i++) {
      const plant = this.seeds[i]
      if (
        this.#started &&
        loadingSeeds.current[plant].current <
          loadingSeeds.current[plant].timeout
      )
        loadingSeeds.current[plant].current += Time.deltaTime
    }
  }
}

class Seed extends GameObject {
  sprite
  activated = false

  constructor(pos: Vector2, public plant: PLANTS) {
    super(GameObjectTypes.UI, pos)

    const index = allPlants.indexOf(plant)

    this.sprite = spritePlants[index]

    this.nodes.push(
      new Clickable(this.transform, new Vector2(24, 96), () => {
        if (!this.started) return
        if (
          loadingSeeds.current[this.plant].current <
          loadingSeeds.current[this.plant].timeout
        )
          return

        if (selectedPlant.current !== this.plant) {
          this.activated = true
          selectedPlant.current = this.plant
        } else {
          selectedPlant.current = null
        }
      })
    )
  }

  lastSelector: typeof selectedPlant.current = null

  started = false
  counter = 0

  start() {
    this.started = true
  }

  draw() {
    const timer = loadingSeeds.current[this.plant]

    if (!this.started) {
      ctx.filter = 'grayscale(75%) brightness(75%)'

      this.sprite.draw(this.transform.x, this.transform.y)
    } else if (this.plant === selectedPlant.current) {
      ctx.filter = 'saturate(150%) brightness(90%)'
      this.sprite.draw(this.transform.x, this.transform.y)
    } else if (timer.current < timer.timeout) {
      const difference = Math.round((16 * timer.current) / timer.timeout)
      ctx.filter = 'grayscale(100%) brightness(30%)'
      this.sprite.freeDraw(
        0,
        0,
        this.transform.x,
        this.transform.y,
        24,
        16 - difference
      )
      ctx.filter = 'grayscale(100%) brightness(40%)'
      this.sprite.freeDraw(
        0,
        16 - difference,
        this.transform.x,
        this.transform.y + 16 - difference,
        24,
        difference
      )
      ctx.filter = 'none'
    } else if (suns.current < plantsInfo[this.plant].price) {
      const difference = Math.round(
        (16 * suns.current) / plantsInfo[this.plant].price
      )
      ctx.filter = 'grayscale(100%) brightness(50%)'
      this.sprite.freeDraw(
        0,
        0,
        this.transform.x,
        this.transform.y,
        24,
        16 - difference
      )
      ctx.filter = 'grayscale(50%) brightness(80%)'
      this.sprite.freeDraw(
        0,
        16 - difference,
        this.transform.x,
        this.transform.y + 16 - difference,
        24,
        difference
      )
    } else {
      ctx.filter = 'none'
      this.sprite.draw(this.transform.x, this.transform.y)
    }

    ctx.filter = 'none'
  }

  update(): void {
    if (this.lastSelector !== selectedPlant.current) {
      if (this.lastSelector === this.plant) {
        this.activated = false
      }

      this.lastSelector = selectedPlant.current
    }
  }
}
