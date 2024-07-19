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
import SpriteTexture from '../../game-engine/utilities/sprite'
import { boards, MAPS, mapsBoardInfo } from '../../utilities/enums/maps'
import { FLOOR_TYPE, PLANT_TYPE } from '../../utilities/enums/plants-props'

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

  mapInfo
  #board

  constructor(public map = MAPS.NORMAL) {
    const mapInfo = mapsBoardInfo[map]
    super(GameObjectTypes.BACKGROUND, new Vector2(40, mapInfo.marginTop))

    this.mapInfo = mapInfo
    this.#board = boards[this.map]

    const sprite = new SpriteTexture(
      '/sprites/ui/maps/' +
        (currentTheme.current === Theme.DAY
          ? map === MAPS.NORMAL
            ? 'day'
            : 'pool'
          : map === MAPS.NORMAL
          ? 'night'
          : 'night-pool') +
        '/bg-mini.png'
    )
    sprite.scale = 2
    this.nodes.push(new Sprite(sprite, new Vector2(0, 0)))

    this.lawnMowers = Array(mapInfo.verticalCellCount)
      .fill(0)
      .map(
        (_, i) =>
          new LawnMower(
            new Vector2(
              24,
              i * this.mapInfo.cellHeight +
                this.transform.y -
                (16 - this.mapInfo.cellHeight)
            )
          )
      )

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

      if (currentTheme.current === Theme.NIGHT) {
        const count = Math.min(positions.length, randomCount)

        for (let i = 0; i < count; i++) {
          const index = getRandomValue(positions.length)

          const { x, y } = positions[index]

          const tomb = new Tomb(
            new Vector2(
              40 + x * mapInfo.cellWidth,
              mapInfo.marginTop + y * mapInfo.cellHeight
            )
          )
          tomb.onDestroy = () => {
            this.#board[y][x].block = null
          }
          this.#board[y][x].block = tomb
          positions.splice(index, 1)
        }
      }
    }
  }

  end = false
  win = false
  setEnd(bool: boolean) {
    this.end = bool
  }

  #onClick(mousePos: Vector2) {
    // if (selectedPlant.current == null) return

    const rx = mousePos.x - this.transform.x
    const ry = mousePos.y - this.transform.y

    const x = Math.floor(rx / this.mapInfo.cellWidth)
    const y = Math.floor(ry / this.mapInfo.cellHeight)

    if (y < 0 || x < 0) return
    if (y < 0) return
    if (
      y >= this.mapInfo.verticalCellCount ||
      x >= this.mapInfo.horizontalCellCount
    )
      return
    if (y >= this.mapInfo.verticalCellCount) return

    if (selectedPlant.current == null) return

    if (allPlants.includes(selectedPlant.current as PLANTS)) {
      this.#plantAPlant(x, y, selectedPlant.current as PLANTS)
    } else if (selectedPlant.current === 'SHOVEL') {
      this.#shovelAction(x, y)
    }
  }

  #plantAPlant(x: number, y: number, plant: PLANTS) {
    if (
      plantsInfo[plant].plantType === PLANT_TYPE.PLANT
        ? this.#board[y][x].plant == null
        : plantsInfo[plant].plantType === PLANT_TYPE.PLATFORM
        ? this.#board[y][x].platform == null
        : false
    ) {
      if (this.#board[y][x].block == null) {
        if (plant === PLANTS.GRAVE_BUSTER) return

        this.#setPlant(x, y, plant)
        return
      }
      if (this.#board[y][x].block instanceof Tomb) {
        if (plant !== PLANTS.GRAVE_BUSTER) return

        this.#setPlant(x, y, plant)
        this.#board[y][x].plant!.addEventListener('destroy', () =>
          this.#board[y][x].block!.destroy()
        )
        return
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

  #getPlantsCoords(x: number, y: number) {
    return new Vector2(
      x * this.mapInfo.cellWidth +
        this.transform.x -
        (16 - this.mapInfo.cellWidth),
      y * this.mapInfo.cellHeight +
        this.transform.y -
        (16 - this.mapInfo.cellHeight)
    )
  }
  #setPlant(x: number, y: number, plant: PLANTS) {
    if (plantsInfo[plant].type !== this.#board[y][x].type) {
      if (plantsInfo[plant].type === FLOOR_TYPE.DIRT) {
        if (this.#board[y][x].platform == null) return
      } else return
    }
    if (Math.random() < 0.5) {
      this.#audioList.plant.play()
    } else {
      this.#audioList.plant2.play()
    }

    suns.current -= plantsInfo[plant].price
    loadingSeeds.current[plant].current = 0

    const newPlant = new plantsClasses[plant](
      this.#getPlantsCoords(x, y).add(
        new Vector2(0, plantsInfo[plant].type === FLOOR_TYPE.DIRT ? -4 : 0)
      ),
      y + 1
    )

    if (plant === PLANTS.LILY_PAD) {
      newPlant.addEventListener('destroy', () => this.#platformDestroy(x, y))
      this.#board[y][x].platform = newPlant
    } else {
      newPlant.addEventListener('destroy', () => this.#plantDestroy(x, y))
      this.#board[y][x].plant = newPlant
    }

    selectedPlant.current = null
  }

  #plantDestroy(x: number, y: number) {
    this.#board[y][x].plant = null
  }
  #platformDestroy(x: number, y: number) {
    this.#board[y][x].platform = null
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
