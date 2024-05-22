export default class Vector2 {
  constructor(public x: number, public y: number) {}

  get roundedX() {
    return Math.round(this.x)
  }
  get roundedY() {
    return Math.round(this.y)
  }

  static ZERO = new Vector2(0, 0)
  static SCREEN = new Vector2(192, 112)

  add(vector2: Vector2) {
    return new Vector2(this.x + vector2.x, this.y + vector2.y)
  }
}
