import { PLANTS } from '../../../utilities/enums/plants'
import { ZOMBIES } from '../../../utilities/enums/zombie'
import DayMap from '../../adventure-mode/day/_day'

export enum DIFFICULTY {
  EASY,
  NORMAL,
  HARD,
}

export default class Day extends DayMap {
  constructor(difficulty: DIFFICULTY, seeds: PLANTS[]) {
    super(
      seeds,
      5,
      difficulty * 0.5,
      difficulty === DIFFICULTY.EASY
        ? [
            {
              porcent: 90,
              wave: 0,
              zombie: ZOMBIES.ZOMBIE,
            },
            {
              porcent: 10,
              wave: 1,
              zombie: ZOMBIES.CONEHEAD_ZOMBIE,
            },
          ]
        : difficulty === DIFFICULTY.NORMAL
        ? [
            {
              porcent: 70,
              wave: 0,
              zombie: ZOMBIES.ZOMBIE,
            },
            {
              porcent: 15,
              wave: 1,
              zombie: ZOMBIES.CONEHEAD_ZOMBIE,
            },
            {
              porcent: 10,
              wave: 1,
              zombie: ZOMBIES.POLE_VAULTING_ZOMBIE,
            },
            {
              porcent: 5,
              wave: 2,
              zombie: ZOMBIES.BUCKETHEAD_ZOMBIE,
            },
          ]
        : [
            {
              porcent: 50,
              wave: 0,
              zombie: ZOMBIES.ZOMBIE,
            },
            {
              porcent: 20,
              wave: 1,
              zombie: ZOMBIES.CONEHEAD_ZOMBIE,
            },
            {
              porcent: 10,
              wave: 1,
              zombie: ZOMBIES.POLE_VAULTING_ZOMBIE,
            },
            {
              porcent: 10,
              wave: 2,
              zombie: ZOMBIES.BUCKETHEAD_ZOMBIE,
            },
          ],
      difficulty + 1
    )
  }
}
