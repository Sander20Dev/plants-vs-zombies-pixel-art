import BucketheadZombie from '../../go/zombies/buckethead-zombie'
import ConeheadZombie from '../../go/zombies/conehead-zombie'
import PoleVaultingZombie from '../../go/zombies/pole-vaulting-zombie'
import NormalZombie from '../../go/zombies/zombie'

export enum ZOMBIES {
  ZOMBIE,
  CONEHEAD_ZOMBIE,
  POLE_VAULTING_ZOMBIE,
  BUCKETHEAD_ZOMBIE,
}

export const zombiesClass = {
  [ZOMBIES.ZOMBIE]: NormalZombie,
  [ZOMBIES.CONEHEAD_ZOMBIE]: ConeheadZombie,
  [ZOMBIES.POLE_VAULTING_ZOMBIE]: PoleVaultingZombie,
  [ZOMBIES.BUCKETHEAD_ZOMBIE]: BucketheadZombie,
}
