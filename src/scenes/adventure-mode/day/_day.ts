import SunSpawner from '../../../classes/controllers/sun-spawner'
import ZombieGenerator from '../../../classes/controllers/zombie-generator'
import Board from '../../../go/ui/board'
import Pause from '../../../go/ui/buttons/pause'
import Seeds from '../../../go/ui/seeds'
import SunCounter from '../../../go/ui/sun-counter'
import { PLANTS } from '../../../utilities/enums/plants'
import { ZOMBIES } from '../../../utilities/enums/zombie'
import Scene from '../../_scene'

export default class DayMap extends Scene {
  constructor(
    plants: PLANTS[],
    rows: number,
    difficulty: number,
    zombies: { porcent: number; zombie: ZOMBIES; wave: number }[],
    waves = 0
  ) {
    const zombieSpawner = new ZombieGenerator(
      {
        waves,
        difficultyPerWave: difficulty,
        zombies,
      },
      rows
    )

    const board = new Board(rows)
    const pauseButton = new Pause()

    zombieSpawner.onEnd = (bool) => board.setEnd(bool)

    board.onGameLose = () => {
      pauseButton.destroy()
    }

    super([
      board,
      new SunCounter(),
      new Seeds(plants),
      new SunSpawner(),
      zombieSpawner,
      pauseButton,
    ])
  }
}
