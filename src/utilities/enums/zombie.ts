import BackupDancer from '../../go/zombies/backup-dancer'
import BucketheadZombie from '../../go/zombies/buckethead-zombie'
import ConeheadZombie from '../../go/zombies/conehead-zombie'
import DancingZombie from '../../go/zombies/dancing-zombie'
import FootballZombie from '../../go/zombies/football-zombie'
import NewspaperZombie from '../../go/zombies/newspaper-zombie'
import PoleVaultingZombie from '../../go/zombies/pole-vaulting-zombie'
import ScreenDoorZombie from '../../go/zombies/screen-door-zombie'
import NormalZombie from '../../go/zombies/zombie'

export enum ZOMBIES {
  ZOMBIE,
  CONEHEAD_ZOMBIE,
  POLE_VAULTING_ZOMBIE,
  BUCKETHEAD_ZOMBIE,

  NEWSPAPER_ZOMBIE,
  SCREEN_DOOR_ZOMBIE,
  FOOTBALL_ZOMBIE,
  DANCING_ZOMBIE,
  BACKUP_DANCER,
}

export const zombiesClass = {
  [ZOMBIES.ZOMBIE]: NormalZombie,
  [ZOMBIES.CONEHEAD_ZOMBIE]: ConeheadZombie,
  [ZOMBIES.POLE_VAULTING_ZOMBIE]: PoleVaultingZombie,
  [ZOMBIES.BUCKETHEAD_ZOMBIE]: BucketheadZombie,

  [ZOMBIES.NEWSPAPER_ZOMBIE]: NewspaperZombie,
  [ZOMBIES.SCREEN_DOOR_ZOMBIE]: ScreenDoorZombie,
  [ZOMBIES.FOOTBALL_ZOMBIE]: FootballZombie,
  [ZOMBIES.DANCING_ZOMBIE]: DancingZombie,
  [ZOMBIES.BACKUP_DANCER]: BackupDancer,
}
