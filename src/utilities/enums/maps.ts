import { GameObject } from '../../game-engine/game-object'
import { FLOOR_TYPE } from './plants-props'

export enum MAPS {
  NORMAL,
  POOL,
}

interface IBoard {
  type: FLOOR_TYPE
  plant: GameObject | null
  platform: GameObject | null
  // protection: GameObject | null,
  // pot: GameObject | null
  block: GameObject | null
}

export const boards: Record<MAPS, IBoard[][]> = {
  [MAPS.NORMAL]: Array(5)
    .fill(0)
    .map(() =>
      Array(9)
        .fill(null)
        .map(() => {
          return {
            type: FLOOR_TYPE.DIRT,
            plant: null,
            platform: null,
            // protection: null,
            // pot: null,
            block: null,
          }
        })
    ),
  [MAPS.POOL]: Array(6)
    .fill(0)
    .map((_, i) =>
      Array(9)
        .fill(null)
        .map(() => {
          if (i === 2 || i === 3) {
            return {
              type: FLOOR_TYPE.WATER,
              plant: null,
              platform: null,
              // protection: null,
              // pot: null,
              block: null,
            }
          }
          return {
            type: FLOOR_TYPE.DIRT,
            plant: null,
            platform: null,
            // protection: null,
            // pot: null,
            block: null,
          }
        })
    ),
}

export const mapsBoardInfo: Record<
  MAPS,
  {
    cellWidth: number
    cellHeight: number
    horizontalCellCount: number
    verticalCellCount: number
    marginTop: number
  }
> = {
  [MAPS.NORMAL]: {
    cellWidth: 16,
    cellHeight: 16,
    horizontalCellCount: 9,
    verticalCellCount: 5,
    marginTop: 24,
  },
  [MAPS.POOL]: {
    cellWidth: 16,
    cellHeight: 14,
    horizontalCellCount: 9,
    verticalCellCount: 6,
    marginTop: 20,
  },
}
