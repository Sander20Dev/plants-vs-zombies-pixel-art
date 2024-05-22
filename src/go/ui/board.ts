import { GameObject, canvas } from '../../classes/game-object'
import AudioPlayer from '../../classes/nodes/audio-player'
import Clickable from '../../classes/nodes/clickable'
import Collision from '../../classes/nodes/collider'
import type NodeAbs from '../../classes/nodes/node'
import Sprite from '../../classes/nodes/sprite'
import Vector2 from '../../classes/vector2'
import { Views } from '../../loader'
import { scenes } from '../../manager/scenes-manager'
import NewPlantScene from '../../scenes/adventure-mode/new-plant'
import { selectedPlant, suns } from '../../states'
import start, { pauseGame } from '../../update'
import { GameObjectTypes } from '../../utilities/enums'
import {
  PLANTS,
  loadingSeeds,
  plantsClasses,
  plantsInfo,
} from '../../utilities/enums/plants'
import Time from '../../utilities/importants/time'
import { getRandomValue } from '../../utilities/random'
import LawnMower from '../accesiories/lawn-mower'
import { images } from './seeds'

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

  constructor(public rows = 5, public winnedPlant?: PLANTS) {
    super(GameObjectTypes.BACKGROUND, new Vector2(40, 24))

    this.nodes.push(
      new Sprite(
        `/sprites/ui/maps/day/bg${rows !== 5 ? '-' + rows : ''}.png`,
        Vector2.ZERO,
        new Vector2(canvas.width, canvas.height)
      )
    )

    this.lawnMowers = [
      rows > 4 ? new LawnMower(new Vector2(24, 24)) : null,
      rows > 2 ? new LawnMower(new Vector2(24, 40)) : null,
      rows > 0 ? new LawnMower(new Vector2(24, 56)) : null,
      rows > 2 ? new LawnMower(new Vector2(24, 72)) : null,
      rows > 4 ? new LawnMower(new Vector2(24, 88)) : null,
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

  #board: (GameObject | null)[][] = Array(5)
    .fill(0)
    .map(() => Array(9).fill(null))

  #onClick(mousePos: Vector2) {
    if (selectedPlant.current == null) return
    const margin = Math.floor((5 - this.rows) / 2)

    const rx = mousePos.x - this.transform.x
    const ry = mousePos.y - this.transform.y

    const x = Math.floor(rx / 16)
    const y = Math.floor(ry / 16)

    if (y < 0 || x < 0) return
    if (y < margin) return
    if (y >= 5 || x >= 9) return
    if (y >= margin + this.rows) return

    if (this.#board[y][x] != null) return

    if (Math.random() < 0.5) {
      this.#audioList.plant.play()
    } else {
      this.#audioList.plant2.play()
    }
    suns.current -= plantsInfo[selectedPlant.current].price
    loadingSeeds[selectedPlant.current].current = 0

    this.#board[y][x] = new plantsClasses[selectedPlant.current](
      new Vector2(x * 16 + this.transform.x, y * 16 + this.transform.y)
    )

    this.#board[y][x]!.onDestroy = () => {
      this.#plantDestroy(x, y)
    }
    selectedPlant.current = null
  }

  #plantDestroy(x: number, y: number) {
    this.#board[y][x] = null
  }

  onGameLose() {}
  onLose() {
    this.endGame = true
    this.#audioList.loseMusic.play()
    this.onGameLose()
    pauseGame()
  }

  onWin() {
    if (this.winnedPlant) new NewPlant(this.winnedPlant)
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
    const sprite = new Sprite(img.img, this.transform, new Vector2(16, 16), {
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
      start()
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
