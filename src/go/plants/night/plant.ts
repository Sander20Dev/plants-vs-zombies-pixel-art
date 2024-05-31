import AnimatedSpritesList from '../../../game-engine/nodes/animated-sprites-list'
import Vector2 from '../../../game-engine/utilities/vector2'
import { currentTheme } from '../../../states'
import { PLANTS } from '../../../utilities/enums/plants'
import { Theme } from '../../../utilities/enums/theme'
import Plant from '../plant'

export default class NightPlant extends Plant {
  animationList = new AnimatedSpritesList(this.transform, {}, 'sleep')
  sleeping = true

  constructor(pos: Vector2, plant: PLANTS, public startAnimation = 'idle') {
    super(pos, plant)
    this.isNightPlant = true
    this.sleeping = Theme.NIGHT !== currentTheme.current
  }

  started = false

  start() {}

  wakeUp() {
    this.sleeping = false
    this.animationList.setCurrentAnimation(this.startAnimation)
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
