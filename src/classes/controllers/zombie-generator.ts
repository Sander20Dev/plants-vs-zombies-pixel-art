import { GameObjectTypes } from '../../utilities/enums'
import {
  getRandomArrayFrom,
  getRandomValue,
  getRandomElementFrom,
} from '../../utilities/random'
import { GameObject } from '../game-object'
import AudioPlayer from '../nodes/audio-player'
import Vector2 from '../vector2'
import { ZOMBIES, zombiesClass } from '../../utilities/enums/zombie'
import { Counter } from '../../utilities/delta'
import Time from '../../utilities/importants/time'
import { Views } from '../../loader'

interface IZombie {
  /** @deprecated */
  time?: number
  waves: number
  difficultyPerWave: number
  zombies: {
    zombie: ZOMBIES
    porcent: number
    /** @deprecated */
    time?: number
    wave: number
  }[]
}

export default class ZombieGenerator extends GameObject {
  audioList = {
    awooga: new AudioPlayer('/audios/env/awooga.ogg'),
  }

  constructor(public zombies: IZombie, public rows = 5) {
    super(GameObjectTypes.UI, Vector2.ZERO)
    this.#waveController = new WaveGenerator(rows, zombies.zombies)

    this.#normalTime = 40 * (zombies.difficultyPerWave + 1)
    this.#normalTimer = new Counter(this.#normalTime, () => {
      console.log('I want a wave!')

      if (!this.waitingAWave && this.#waveCounter < this.zombies.waves) {
        this.#generateWave()
      }
    })
  }

  end = false

  #counter = 0
  #difficulty = 1
  #allTime = 0
  #init = false

  #normalTime
  #normalTimer

  #waveController
  #waveCounter = 0

  waitingAWave = false

  #generateAZombie(z: ZOMBIES) {
    const margin = Math.floor((5 - this.rows) / 2)

    for (
      let i = 0;
      i <
      getRandomValue(
        Math.ceil(Math.min(this.rows + 1, this.rows * this.#difficulty))
      );
      i++
    ) {}
    new zombiesClass[z](
      new Vector2(192, (margin + getRandomValue(this.rows)) * 16 + 24)
    )
  }

  #spawnZombie() {
    for (
      let i = 0;
      i <
      getRandomValue(
        Math.min(
          Math.floor(
            this.#difficulty + (this.#allTime / 40) * this.#difficulty
          ),
          this.rows + 1
        ),
        this.#difficulty
      );
      i++
    ) {
      const zombie = getRandomElementFrom(
        this.zombies.zombies
          .filter(({ wave }) => this.#waveCounter >= wave)
          .map(({ zombie: element, porcent }) => ({ element, porcent }))
      )

      if (zombie == null) return

      this.#generateAZombie(zombie)
    }
  }

  #generateWave() {
    this.waitingAWave = true
  }

  waitAWave() {
    if (!this.waitingAWave) return

    if (Views.get(GameObjectTypes.ZOMBIE).length > 0) return

    this.waitingAWave = false
    this.#startAWave()
  }

  #startAWave() {
    this.#waveController.zombies = this.zombies.zombies.filter(
      ({ wave }) => this.#waveCounter >= wave
    )
    this.#waveCounter += 1
    this.#waveController.currentWave = this.#waveCounter
    this.#difficulty += this.zombies.difficultyPerWave
    this.#waveController.maxZGen = Math.round(this.#difficulty)
    this.#waveController.start()
    if (this.#waveCounter >= this.zombies.waves) {
      this.#waveController.onEnd = () => {
        this.end = true
        this.onEnd(true)
      }
    } else {
      this.#waveController.onEnd = () => {
        this.#normalTimer.play()
      }
    }
  }

  onEnd(bool: boolean) {}

  update() {
    this.#waveController.update()

    if (this.end) return

    this.#counter += Time.deltaTime
    this.#normalTimer.updater()
    this.#allTime += Time.deltaTime

    this.waitAWave()

    if (!this.#init) {
      if (this.#counter >= 25) {
        this.#init = true
        this.#counter -= 25
        this.#normalTimer.play()
        this.audioList.awooga.play()
        this.#generateAZombie(this.zombies.zombies[0].zombie)
      }
    } else {
      const r = getRandomValue(15, 8)
      if (this.#counter >= r) {
        this.#counter -= r
        if (!this.#waveController.inWave && !this.waitingAWave) {
          this.#spawnZombie()
        }
      }
    }
  }
}

class WaveGenerator {
  currentWave = 0
  maxZGen = 1

  audioList = {
    siren: new AudioPlayer('/audios/env/siren.ogg'),
    hugewave: new AudioPlayer('/audios/env/hugewave.ogg'),
  }

  constructor(
    public rows: number,
    public zombies: {
      zombie: ZOMBIES
      porcent: number
    }[]
  ) {}

  #startCounter = new Counter(10, () => this.#generateWave())
  #endCounter = new Counter(4, () => this.onEnd())

  inWave = false

  #generateWave() {
    const ex = getRandomValue(Math.max(this.maxZGen * 2 + 2, 2), 1)

    const zombies = getRandomArrayFrom(
      this.zombies.map(({ zombie: element, porcent }) => ({
        element,
        porcent,
      })),
      this.rows * ex
    )

    this.audioList.hugewave.play()
    this.audioList.siren.play()

    const margin = Math.floor((5 - this.rows) / 2)

    for (let i = 0; i < zombies.length; i++) {
      const zombie = zombies[i]
      new zombiesClass[zombie](
        new Vector2(
          getRandomValue(20) * 4 + 200,
          (margin + Math.floor(i / ex)) * 16 + 24
        )
      )
    }
    this.#endCounter.play()
  }

  start() {
    this.inWave = true
    this.#startCounter.play()
  }

  onEnd() {
    this.inWave = false
  }

  update() {
    this.#startCounter.updater()
    this.#endCounter.updater()
  }
}
