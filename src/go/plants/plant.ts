import Entity from '../../_mods-ge/entity'
// import AnimatedSprite from '../../game-engine/nodes/animated-sprite'
// import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
// import Sprite from '../../game-engine/nodes/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
// import { Counter } from '../../utilities/delta'
import { GameObjectTypes } from '../../utilities/enums'
import { PLANTS, plantsInfo } from '../../utilities/enums/plants'

export default class Plant extends Entity {
  isLarge = false
  isNightPlant = false

  /* context = {
    attacked: false,
  }

  #attackedCounter = new Counter(0.2, () => {
    this.context.attacked = false
  }) */

  constructor(pos: Vector2, public plant: PLANTS, zIndex?: number) {
    super(
      GameObjectTypes.PLANT,
      pos,
      plantsInfo[plant].health,
      plantsInfo[plant].damage,
      { zIndex }
    )
  }
  /* 
  attack(damage: number): boolean {
    if (damage < this.health) {
      this.context.attacked = true

      this.#attackedCounter.restart()
      this.#attackedCounter.play()
    }

    return super.attack(damage)
  }

  draw(): void {
    super.draw()

    const animationList = this.nodes.find(
      (node) => node instanceof AnimatedSpritesList
    )
    const animation = this.nodes.find((node) => node instanceof AnimatedSprite)
    const sprite = this.nodes.find((node) => node instanceof Sprite)

    if (this.context.attacked) {
      if (animationList) animationList.filters = 'brightness(150%)'
      if (animation) animation.filter = 'brightness(150%)'
      if (sprite) sprite.filters = 'brightness(150%)'
    } else {
      if (animationList) animationList.filters = 'none'
      if (animation) animation.filter = 'none'
      if (sprite) sprite.filters = 'none'
    }
  }

  priority(): void {
    this.#attackedCounter.updater()
  } */
}
