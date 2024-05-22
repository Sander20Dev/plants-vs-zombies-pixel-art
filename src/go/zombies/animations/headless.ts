import Vector2 from '../../../classes/vector2'
import AnimationObject from './_animation'

export default class Headless extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      [
        '/sprites/zombies/zombie/headless-1.png',
        '/sprites/zombies/zombie/headless-2.png',
        '/sprites/zombies/zombie/headless-3.png',
        '/sprites/zombies/zombie/headless-4.png',
        '/sprites/zombies/zombie/headless-5.png',
        '/sprites/zombies/zombie/headless-6.png',
        '/sprites/zombies/zombie/headless-7.png',
        '/sprites/zombies/zombie/headless-8.png',
        '/sprites/zombies/zombie/headless-9.png',
        '/sprites/zombies/zombie/headless-10.png',
      ],
      10,
      new Vector2(16, 16),
      { loop: false }
    )
  }
}

export class Fired extends AnimationObject {
  constructor(pos: Vector2) {
    super(
      pos,
      [
        '/sprites/zombies/zombie/fired-1.png',
        '/sprites/zombies/zombie/fired-2.png',
        '/sprites/zombies/zombie/fired-3.png',
        '/sprites/zombies/zombie/fired-4.png',
        '/sprites/zombies/zombie/fired-5.png',
        '/sprites/zombies/zombie/fired-6.png',
        '/sprites/zombies/zombie/fired-7.png',
        '/sprites/zombies/zombie/fired-8.png',
        '/sprites/zombies/zombie/fired-9.png',
        '/sprites/zombies/zombie/fired-10.png',
      ],
      10,
      new Vector2(16, 16),
      { loop: false }
    )
  }
}
