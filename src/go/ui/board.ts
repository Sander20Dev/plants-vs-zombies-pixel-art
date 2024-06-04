import { GameObject } from '../../game-engine/game-object'
import AudioPlayer from '../../game-engine/nodes/audio-player'
import Clickable from '../../game-engine/nodes/clickable'
import Collision from '../../game-engine/nodes/collider'
import type NodeAbs from '../../game-engine/nodes/node'
import Sprite from '../../game-engine/nodes/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { Views } from '../../game-engine/lib/loader'
import {
  currentDifficulty,
  currentTheme,
  selectedPlant,
  suns,
} from '../../states'
import { pauseGame } from '../../game-engine/lib/update'
import { GameObjectTypes } from '../../utilities/enums'
import {
  PLANTS,
  allPlants,
  loadingSeeds,
  plantsClasses,
  plantsInfo,
} from '../../utilities/enums/plants'
import LawnMower from '../accesiories/lawn-mower'
import { Theme } from '../../utilities/enums/theme'
import Tomb from '../accesiories/tomb'
import { getRandomValue } from '../../utilities/random'

export default class Board extends GameObject {
  endGame = false

  #audioList = {
    plant: new AudioPlayer('/audios/plant.ogg'),
    plant2: new AudioPlayer('/audios/plant2.ogg'),
    loseMusic: new AudioPlayer('/audios/env/losemusic.ogg', {
      pauseSound: true,
    }),
  }

  nodes: NodeAbs[] = [
    new Clickable(this.transform, new Vector2(144, 80), (c) =>
      this.#onClick(c)
    ),
    new Collision(
      this,
      new Vector2(-40, 0),
      new Vector2(30, 80),
      GameObjectTypes.ZOMBIE,
      () => {
        if (!this.endGame) {
          this.onLose()
        }
      }
    ),
  ]
  lawnMowers: (LawnMower | null)[]

  constructor() {
    super(GameObjectTypes.BACKGROUND, new Vector2(40, 24))

    this.nodes.push(
      new Sprite(
        '/sprites/ui/maps/' +
          (currentTheme.current === Theme.DAY ? 'day' : 'night') +
          '/bg.png',
        new Vector2(0, 0)
      )
    )

    this.lawnMowers = [
      new LawnMower(new Vector2(24, 24)),
      new LawnMower(new Vector2(24, 40)),
      new LawnMower(new Vector2(24, 56)),
      new LawnMower(new Vector2(24, 72)),
      new LawnMower(new Vector2(24, 88)),
    ]

    for (let i = 0; i < this.lawnMowers.length; i++) {
      if (this.lawnMowers[i] != null) {
        this.lawnMowers[i]!.onDestroy = () => {
          this.lawnMowers[i] = null
        }
      }
    }

    if (currentTheme.current === Theme.NIGHT) {
      const { min, max } = {
        min: currentDifficulty.current + 1,
        max: currentDifficulty.current * 2 + 2,
      }

      const randomCount = getRandomValue(max + 1, min)

      const positions: Vector2[] = []

      for (let y = 0; y < 5; y++) {
        for (let x = 5 - currentDifficulty.current; x < 9; x++) {
          if (
            this.#board[y][x].block == null &&
            this.#board[y][x].plant == null
          ) {
            positions.push(new Vector2(x, y))
          }
        }
      }

      const count = Math.min(positions.length, randomCount)

      for (let i = 0; i < count; i++) {
        const index = getRandomValue(positions.length)

        const { x, y } = positions[index]

        const tomb = new Tomb(new Vector2(40 + x * 16, 24 + y * 16))
        tomb.onDestroy = () => {
          this.#board[y][x].block = null
        }
        this.#board[y][x].block = tomb
        positions.splice(index, 1)
      }
    }
  }

  end = false
  win = false
  setEnd(bool: boolean) {
    this.end = bool
  }

  #board: {
    type: 'dirt' | 'water' | 'stone'
    plant: GameObject | null
    // protection: GameObject | null,
    // pot: GameObject | null
    block: GameObject | null
  }[][] = Array(5)
    .fill(0)
    .map(() =>
      Array(9)
        .fill(null)
        .map(() => {
          return {
            type: 'dirt',
            plant: null,
            // protection: null,
            // pot: null,
            block: null,
          }
        })
    )

  #onClick(mousePos: Vector2) {
    if (selectedPlant.current == null) return

    const rx = mousePos.x - this.transform.x
    const ry = mousePos.y - this.transform.y

    const x = Math.floor(rx / 16)
    const y = Math.floor(ry / 16)

    if (y < 0 || x < 0) return
    if (y < 0) return
    if (y >= 5 || x >= 9) return
    if (y >= 5) return

    if (allPlants.includes(selectedPlant.current as PLANTS)) {
      this.#plantAPlant(x, y, selectedPlant.current as PLANTS)
    } else if (selectedPlant.current === 'SHOVEL') {
      this.#shovelAction(x, y)
    }
  }

  #plantAPlant(x: number, y: number, plant: PLANTS) {
    if (this.#board[y][x].plant == null) {
      if (this.#board[y][x].block == null) {
        if (plant === PLANTS.GRAVE_BUSTER) return

        if (Math.random() < 0.5) {
          this.#audioList.plant.play()
        } else {
          this.#audioList.plant2.play()
        }
        suns.current -= plantsInfo[plant].price
        loadingSeeds.current[plant].current = 0

        this.#board[y][x].plant = new plantsClasses[plant](
          new Vector2(x * 16 + this.transform.x, y * 16 + this.transform.y)
        )

        this.#board[y][x].plant!.onDestroy = () => {
          this.#plantDestroy(x, y)
        }
        selectedPlant.current = null
      } else {
        if (!(this.#board[y][x].block instanceof Tomb)) return
        if (plant !== PLANTS.GRAVE_BUSTER) return
        if (Math.random() < 0.5) {
          this.#audioList.plant.play()
        } else {
          this.#audioList.plant2.play()
        }
        suns.current -= plantsInfo[plant].price
        loadingSeeds.current[plant].current = 0

        this.#board[y][x].plant = new plantsClasses[plant](
          new Vector2(x * 16 + this.transform.x, y * 16 + this.transform.y),
          this.#board[y][x].block as Tomb
        )

        this.#board[y][x].plant!.onDestroy = () => {
          this.#plantDestroy(x, y)
        }
        selectedPlant.current = null
      }
    }
  }

  #shovelAction(x: number, y: number) {
    if (this.#board[y][x].plant != null) {
      this.#board[y][x].plant!.destroy()
      selectedPlant.current = null
      this.#audioList.plant.play()
    }
  }

  #plantDestroy(x: number, y: number) {
    this.#board[y][x].plant = null
  }

  onGameLose() {}
  onLose() {
    this.endGame = true
    this.#audioList.loseMusic.play()
    this.onGameLose()
    pauseGame()
  }

  onWin() {
    // TODO: Add win sound
  }

  update() {
    if (!this.win && this.end && Views.get(GameObjectTypes.ZOMBIE).length < 1) {
      this.onWin()
      this.win = true
    }
  }
}
