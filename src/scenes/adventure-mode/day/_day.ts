import SunSpawner from '../../../_mods-ge/controllers/sun-spawner'
import ZombieGenerator from '../../../_mods-ge/controllers/zombie-generator'
import Board from '../../../go/ui/board'
import Pause from '../../../go/ui/buttons/pause'
import Seeds from '../../../go/ui/seeds'
import SunCounter from '../../../go/ui/sun-counter'
import { currentDifficulty, currentTheme } from '../../../states'
import { PLANTS } from '../../../utilities/enums/plants'
import { Theme } from '../../../utilities/enums/theme'
import { ZOMBIES } from '../../../utilities/enums/zombie'
import Scene from '../../_scene'

export default class DayMap extends Scene {
  constructor(
    plants: PLANTS[],
    difficulty: number,
    zombies: { porcent: number; zombie: ZOMBIES; wave: number }[],
    waves = 0
  ) {
    currentTheme.current = Theme.DAY
    currentDifficulty.current = difficulty

    const zombieSpawner = new ZombieGenerator({
      waves,
      difficultyPerWave: difficulty,
      zombies,
    })

    const board = new Board()
    const pauseButton = new Pause()

    zombieSpawner.onEnd = (bool) => board.setEnd(bool)

    board.onGameLose = () => {
      pauseButton.destroy()
    }

    super([
      board,
      new SunCounter(),
      new Seeds(plants, Theme.DAY),
      new SunSpawner(),
      zombieSpawner,
      pauseButton,
    ])
  }
}
