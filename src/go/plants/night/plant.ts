import { GameObject } from '../../../game-engine/game-object'
import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import Vector2 from '../../../game-engine/utilities/vector2'
import { currentTheme } from '../../../states'
import { GameObjectTypes } from '../../../utilities/enums'
import { PLANTS } from '../../../utilities/enums/plants'
import { Theme } from '../../../utilities/enums/theme'
import Plant from '../plant'

export default class NightPlant extends Plant {
  animationList = new AnimatedSpritesList(this.transform, {}, 'sleep')
  sleeping = true

  zzz = new ZZZ(this.transform.add(new Vector2(8, -4)))

  constructor(pos: Vector2, plant: PLANTS, public startAnimation = 'idle') {
    super(pos, plant)
    this.isNightPlant = true
    this.sleeping = Theme.NIGHT !== currentTheme.current

    this.zzz.hide = !this.sleeping
  }

  started = false

  start() {}

  wakeUp() {
    this.sleeping = false
    this.zzz.destroy()
    this.animationList.setCurrentAnimation(this.startAnimation, true)
    this.start()
  }

  update(): void {
    if (!this.started) {
      if (this.sleeping) {
        this.animationList.setCurrentAnimation('sleep')
      } else {
        this.started = true
        this.wakeUp()
      }
    }
    super.update()
  }
}

const zzz = importSpriteSheet(
  '/sprites/plants/night/zzz.png',
  new Vector2(16),
  4
)

class ZZZ extends GameObject {
  constructor(pos: Vector2) {
    super(GameObjectTypes.PLANT, pos)
    this.nodes.push(new AnimatedSprite(this.transform, zzz, 4))
  }
}
import { importSpriteSheet } from '../../../game-engine/utilities/sprite'
import AnimatedSprite from '../../../game-engine/nodes/animated-sprite'
