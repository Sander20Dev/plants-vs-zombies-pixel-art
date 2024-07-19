import CherryBomb from '../../go/plants/day/cherry-bomb'
import Chomper from '../../go/plants/day/chomper'
import SnowPea from '../../go/plants/day/snow-pea'
import Peashooter from '../../go/plants/day/peashooter'
import PotatoMine from '../../go/plants/day/potato-mine'
import Repeater from '../../go/plants/day/repeater'
import Sunflower from '../../go/plants/day/sunflower'
import WallNut from '../../go/plants/day/wall-nut'
import PuffShroom from '../../go/plants/night/puff-shroom'
import SunShroom from '../../go/plants/night/sun-shroom'
import FumeShroom from '../../go/plants/night/fume-shroom'
import ScaredyShroom from '../../go/plants/night/scaredy-shroom'
import GraveBuster from '../../go/plants/night/grave-buster'
import ImpactShroom from '../../go/plants/night/impact-shroom'
import IceShroom from '../../go/plants/night/ice-shroom'
import DoomShroom from '../../go/plants/night/doom-shroom'
import { FLOOR_TYPE, PLANT_TYPE } from './plants-props'
import LilyPad from '../../go/plants/pool/lily-pad'
import Squash from '../../go/plants/pool/squash'
import Threepeater from '../../go/plants/pool/threepeater'

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
  GRAVE_BUSTER = 'grave-buster',
  IMPACT_SHROOM = 'impact-shroom',
  SCAREDY_SHROOM = 'scaredy-shroom',
  ICE_SHROOM = 'ice-shroom',
  DOOM_SHROOM = 'doom-shroom',

  LILY_PAD = 'lily-pad',
  SQUASH = 'squash',
  THREEPEATER = 'threepeater',
}

export const allPlants = [
  // DAY plants
  PLANTS.PEASHOOTER,
  PLANTS.SUNFLOWER,
  PLANTS.CHERRY_BOMB,
  PLANTS.WALL_NUT,
  PLANTS.POTATO_MINE,
  PLANTS.SNOW_PEA,
  PLANTS.CHOMPER,
  PLANTS.REAPEATER,
  // NIGHT plants
  PLANTS.PUFF_SHROOM,
  PLANTS.SUN_SHROOM,
  PLANTS.FUME_SHROOM,
  PLANTS.GRAVE_BUSTER,
  PLANTS.IMPACT_SHROOM,
  PLANTS.SCAREDY_SHROOM,
  PLANTS.ICE_SHROOM,
  PLANTS.DOOM_SHROOM,
  // POOL plants
  PLANTS.LILY_PAD,
  PLANTS.SQUASH,
  PLANTS.THREEPEATER,
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
  [PLANTS.GRAVE_BUSTER]: GraveBuster,
  [PLANTS.IMPACT_SHROOM]: ImpactShroom,
  [PLANTS.SCAREDY_SHROOM]: ScaredyShroom,
  [PLANTS.ICE_SHROOM]: IceShroom,
  [PLANTS.DOOM_SHROOM]: DoomShroom,

  [PLANTS.LILY_PAD]: LilyPad,
  [PLANTS.SQUASH]: Squash,
  [PLANTS.THREEPEATER]: Threepeater,
}

interface IPlantInfo {
  price: number
  health: number
  damage?: number
  type: FLOOR_TYPE
  plantType: PLANT_TYPE
}

export const plantsInfo: Record<PLANTS, IPlantInfo> = {
  [PLANTS.PEASHOOTER]: {
    price: 100,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.SUNFLOWER]: {
    price: 50,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.CHERRY_BOMB]: {
    price: 150,
    health: 4000,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
    damage: 1800,
  },
  [PLANTS.WALL_NUT]: {
    price: 50,
    health: 4000,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.POTATO_MINE]: {
    price: 25,
    health: 450,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
    damage: 1800,
  },
  [PLANTS.SNOW_PEA]: {
    price: 175,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.CHOMPER]: {
    price: 150,
    health: 600,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
    damage: 1800,
  },
  [PLANTS.REAPEATER]: {
    price: 200,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },

  [PLANTS.PUFF_SHROOM]: {
    price: 0,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.SUN_SHROOM]: {
    price: 25,
    health: 400,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.FUME_SHROOM]: {
    price: 75,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.GRAVE_BUSTER]: {
    price: 75,
    health: 500,
    type: FLOOR_TYPE.TOMB,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.IMPACT_SHROOM]: {
    price: 100,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.SCAREDY_SHROOM]: {
    price: 25,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.ICE_SHROOM]: {
    price: 75,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.DOOM_SHROOM]: {
    price: 125,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
  },
  [PLANTS.LILY_PAD]: {
    price: 25,
    health: 500,
    type: FLOOR_TYPE.WATER,
    plantType: PLANT_TYPE.PLATFORM,
    damage: 1800,
  },
  [PLANTS.SQUASH]: {
    price: 50,
    health: 5000,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
    damage: 1800,
  },
  [PLANTS.THREEPEATER]: {
    price: 325,
    health: 500,
    type: FLOOR_TYPE.DIRT,
    plantType: PLANT_TYPE.PLANT,
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
  [PLANTS.GRAVE_BUSTER]: {
    timeout: 10,
    current: 0,
  },
  [PLANTS.IMPACT_SHROOM]: {
    timeout: 10,
    current: 0,
  },
  [PLANTS.SCAREDY_SHROOM]: {
    timeout: 10,
    current: 0,
  },
  [PLANTS.ICE_SHROOM]: {
    timeout: 60,
    current: 0,
  },
  [PLANTS.DOOM_SHROOM]: {
    timeout: 60,
    current: 0,
  },
  [PLANTS.LILY_PAD]: {
    timeout: 10,
    current: 0,
  },
  [PLANTS.SQUASH]: {
    timeout: 40,
    current: 0,
  },
  [PLANTS.THREEPEATER]: {
    timeout: 30,
    current: 0,
  },
}

export const loadingSeeds = { current: structuredClone(defaultLoadingSeeds) }
