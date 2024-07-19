import { GameObject } from '../../game-engine/game-object'
import AnimatedSpritesList from '../../game-engine/nodes/animated-sprites-list'
import { importSpriteSheet } from '../../game-engine/utilities/sprite'
import Vector2 from '../../game-engine/utilities/vector2'
import { GameObjectTypes } from '../../utilities/enums'
import { getRandomElementFrom } from '../../utilities/random'

const tombs = {
  squared: importSpriteSheet(
    '/sprites/ui/tomb/squared.png',
    new Vector2(16),
    5
  ),
  rounded: importSpriteSheet(
    '/sprites/ui/tomb/rounded.png',
    new Vector2(16),
    5
  ),
  cross: importSpriteSheet('/sprites/ui/tomb/cross.png', new Vector2(16), 5),
  roundedcross: importSpriteSheet(
    '/sprites/ui/tomb/roundedcross.png',
    new Vector2(16),
    5
  ),
  zombiecup: importSpriteSheet(
    '/sprites/ui/tomb/zombiecup.png',
    new Vector2(16),
    5
  ),
}

const tombsName: { porcent: number; element: keyof typeof tombs }[] = [
  { porcent: 24.875, element: 'squared' },
  { porcent: 24.875, element: 'rounded' },
  { porcent: 24.875, element: 'cross' },
  { porcent: 24.875, element: 'roundedcross' },
  { porcent: 0.5, element: 'zombiecup' },
]

export default class Tomb extends GameObject {
  tomb = getRandomElementFrom(tombsName) ?? 'squared'

  animationList = new AnimatedSpritesList(
    this.transform,
    {
      'grow-up': {
        sprites: tombs[this.tomb],
        fps: 2.5,
        loop: false,
      },
      normal: {
        sprites: [tombs[this.tomb][4]],
        fps: 1,
      },
    },
    'grow-up'
  )

  constructor(pos: Vector2) {
    super(GameObjectTypes.BACKGROUND, pos, { zIndex: 10 })

    this.nodes.push(this.animationList)
    this.animationList.currentAnimation.play()

    this.animationList.animations['grow-up'].onEnd = () => {
      this.animationList.setCurrentAnimation('normal', true)
    }
  }
}
