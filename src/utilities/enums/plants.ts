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
import FumeShroom from '../../go/plants/night/fume-shroom'
import ScaredyShroom from '../../go/plants/night/scaredy-shroom'

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
  FUME_SHROOM = 'fume-shroom',
  SCAREDY_SHROOM = 'scaredy-shroom',
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
  PLANTS.FUME_SHROOM,
  PLANTS.SCAREDY_SHROOM,
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
  [PLANTS.FUME_SHROOM]: FumeShroom,
  [PLANTS.SCAREDY_SHROOM]: ScaredyShroom,
}

export const plantsInfo: Record<
  PLANTS,
  { price: number; health: number; damage?: number }
> = {
  [PLANTS.PEASHOOTER]: {
    price: 100,
    health: 500,
  },
  [PLANTS.SUNFLOWER]: {
    price: 50,
    health: 500,
  },
  [PLANTS.CHERRY_BOMB]: {
    price: 150,
    health: 4000,
    damage: 1800,
  },
  [PLANTS.WALL_NUT]: {
    price: 50,
    health: 4000,
  },
  [PLANTS.POTATO_MINE]: {
    price: 25,
    health: 450,
    damage: 1800,
  },
  [PLANTS.SNOW_PEA]: {
    price: 175,
    health: 500,
  },
  [PLANTS.CHOMPER]: {
    price: 150,
    health: 600,
    damage: 1800,
  },
  [PLANTS.REAPEATER]: {
    price: 200,
    health: 500,
  },

  [PLANTS.PUFF_SHROOM]: {
    price: 0,
    health: 500,
  },
  [PLANTS.SUN_SHROOM]: {
    price: 25,
    health: 400,
  },
  [PLANTS.FUME_SHROOM]: {
    price: 75,
    health: 500,
  },
  [PLANTS.SCAREDY_SHROOM]: {
    price: 25,
    health: 500,
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
  [PLANTS.FUME_SHROOM]: {
    timeout: 10,
    current: 0,
  },
  [PLANTS.SCAREDY_SHROOM]: {
    timeout: 10,
    current: 0,
  },
}

export const loadingSeeds = { current: structuredClone(defaultLoadingSeeds) }
