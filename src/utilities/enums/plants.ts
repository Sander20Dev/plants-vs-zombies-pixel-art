import CherryBomb from '../../go/plants/cherry-bomb'
import Chomper from '../../go/plants/chomper'
import SnowPea from '../../go/plants/snow-pea'
import Peashooter from '../../go/plants/peashooter'
import PotatoMine from '../../go/plants/potato-mine'
import Repeater from '../../go/plants/repeater'
import Sunflower from '../../go/plants/sunflower'
import WallNut from '../../go/plants/wall-nut'
import PuffShroom from '../../go/plants/night/puff-shroom'
import SunShroom from '../../go/plants/night/sun-shroom'

export enum PLANTS {
  PEASHOOTER = 'peashooter',
  SUNFLOWER = 'sunflower',
  CHERRY_BOMB = 'cherry-bomb',
  WALL_NUT = 'wall-nut',
  POTATO_MINE = 'potato-mine',
  SNOW_PEA = 'snow-pea',
  CHOMPER = 'chomper',
  REAPEATER = 'repeater',

  PUFF_SHROOM = 'puff-shroom',
  SUN_SHROOM = 'sun-shroom',
}

export const allPlants = [
  PLANTS.PEASHOOTER,
  PLANTS.SUNFLOWER,
  PLANTS.CHERRY_BOMB,
  PLANTS.WALL_NUT,
  PLANTS.POTATO_MINE,
  PLANTS.SNOW_PEA,
  PLANTS.CHOMPER,
  PLANTS.REAPEATER,

  PLANTS.PUFF_SHROOM,
  PLANTS.SUN_SHROOM,
]

export const plantsClasses = {
  [PLANTS.PEASHOOTER]: Peashooter,
  [PLANTS.SUNFLOWER]: Sunflower,
  [PLANTS.CHERRY_BOMB]: CherryBomb,
  [PLANTS.WALL_NUT]: WallNut,
  [PLANTS.POTATO_MINE]: PotatoMine,
  [PLANTS.SNOW_PEA]: SnowPea,
  [PLANTS.CHOMPER]: Chomper,
  [PLANTS.REAPEATER]: Repeater,

  [PLANTS.PUFF_SHROOM]: PuffShroom,
  [PLANTS.SUN_SHROOM]: SunShroom,
}

export const plantsInfo: Record<
  PLANTS,
  { price: number; health: number; damage?: number }
> = {
  [PLANTS.PEASHOOTER]: {
    price: 4,
    health: 300,
  },
  [PLANTS.SUNFLOWER]: {
    price: 2,
    health: 400,
  },
  [PLANTS.CHERRY_BOMB]: {
    price: 6,
    health: 4000,
    damage: 1800,
  },
  [PLANTS.WALL_NUT]: {
    price: 2,
    health: 4000,
  },
  [PLANTS.POTATO_MINE]: {
    price: 1,
    health: 450,
    damage: 1800,
  },
  [PLANTS.SNOW_PEA]: {
    price: 7,
    health: 400,
  },
  [PLANTS.CHOMPER]: {
    price: 6,
    health: 600,
    damage: 1800,
  },
  [PLANTS.REAPEATER]: {
    price: 8,
    health: 500,
  },

  [PLANTS.PUFF_SHROOM]: {
    price: 0,
    health: 500,
  },
  [PLANTS.SUN_SHROOM]: {
    price: 1,
    health: 400,
  },
}

export const defaultLoadingSeeds = {
  [PLANTS.PEASHOOTER]: {
    timeout: 10,
    current: 0,
  },
  [PLANTS.SUNFLOWER]: {
    timeout: 5,
    current: 5,
  },
  [PLANTS.CHERRY_BOMB]: {
    timeout: 60,
    current: 0,
  },
  [PLANTS.WALL_NUT]: {
    timeout: 40,
    current: 0,
  },
  [PLANTS.POTATO_MINE]: {
    timeout: 40,
    current: 0,
  },
  [PLANTS.SNOW_PEA]: {
    timeout: 15,
    current: 0,
  },
  [PLANTS.CHOMPER]: {
    timeout: 30,
    current: 0,
  },
  [PLANTS.REAPEATER]: {
    timeout: 15,
    current: 0,
  },

  [PLANTS.PUFF_SHROOM]: {
    timeout: 10,
    current: 0,
  },
  [PLANTS.SUN_SHROOM]: {
    timeout: 5,
    current: 5,
  },
}

export const loadingSeeds = structuredClone(defaultLoadingSeeds)
