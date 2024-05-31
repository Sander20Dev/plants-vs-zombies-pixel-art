import { GameObject } from '../../game-engine/game-object'
import AudioPlayer from '../../game-engine/nodes/audio-player'
import Clickable from '../../game-engine/nodes/clickable'
import Collision from '../../game-engine/nodes/collider'
import type NodeAbs from '../../game-engine/nodes/node'
import Sprite from '../../game-engine/nodes/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { Views } from '../../game-engine/lib/loader'
import { scenes } from '../../manager/scenes-manager'
import NewPlantScene from '../../scenes/adventure-mode/new-plant'
import { selectedPlant, suns } from '../../states'
import { pauseGame } from '../../game-engine/lib/update'
import { GameObjectTypes } from '../../utilities/enums'
import {
  PLANTS,
  allPlants,
  loadingSeeds,
  plantsClasses,
  plantsInfo,
} from '../../utilities/enums/plants'
import Time from '../../game-engine/utilities/time'
import { getRandomValue } from '../../utilities/random'
import LawnMower from '../accesiories/lawn-mower'
import { images } from './seeds'
import { Theme } from '../../utilities/enums/theme'

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

  constructor(public theme = Theme.DAY) {
    super(GameObjectTypes.BACKGROUND, new Vector2(40, 24))

    this.nodes.push(
      new Sprite(
        '/sprites/ui/maps/' +
          (theme === Theme.DAY ? 'day' : 'night') +
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
      if (Math.random() < 0.5) {
        this.#audioList.plant.play()
      } else {
        this.#audioList.plant2.play()
      }
      suns.current -= plantsInfo[plant].price
      loadingSeeds.current[plant].current = 0

      this.#board[y][x] = {
        type: this.#board[y][x].type,
        plant: new plantsClasses[plant](
          new Vector2(x * 16 + this.transform.x, y * 16 + this.transform.y)
        ),
      }

      this.#board[y][x].plant!.onDestroy = () => {
        this.#plantDestroy(x, y)
      }
      selectedPlant.current = null
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

class NewPlant extends GameObject {
  audios = {
    winMusic: new AudioPlayer('/audios/env/winmusic.ogg', { pauseSound: true }),
  }

  constructor(public plant: PLANTS) {
    super(
      GameObjectTypes.ANIMATION,
      new Vector2(getRandomValue(128, 40), getRandomValue(64, 24))
    )

    const img = images.find(({ plant: p }) => p === plant)!
    const sprite = new Sprite(img.img, this.transform, {
      rawCoords: true,
    })
    this.nodes = [sprite]

    this.audios.winMusic.play()

    class A extends NewPlantScene {
      constructor() {
        super(plant)
      }
    }
    this.audios.winMusic.audio.onended = () => {
      scenes.changeScene(A)
      Time.timeRate = 1
    }
  }

  moveTo(to: Vector2, speed: number) {
    const x = to.x - this.transform.x
    const y = to.y - this.transform.y

    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

    const k = distance / speed

    return new Vector2(x / k, y / k)
  }

  center = new Vector2(88, 48)

  update(): void {
    if (
      (this.transform.roundedX >= this.center.roundedX &&
        this.transform.roundedY >= this.center.roundedY &&
        this.transform.roundedX <= this.center.roundedX + 8 &&
        this.transform.roundedY <= this.center.roundedY + 8) ||
      this.transform.x < 0 ||
      this.transform.y < 0
    ) {
      this.transform.x = this.center.x
      this.transform.y = this.center.y
    } else {
      const m = this.moveTo(this.center, 50)

      this.transform.x += m.x * Time.deltaTime
      this.transform.y += m.y * Time.deltaTime
    }
  }
}
