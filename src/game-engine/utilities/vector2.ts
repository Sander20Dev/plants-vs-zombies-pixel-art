export default class Vector2 {
  x: number
  y: number

  constructor(x: number, y?: number) {
    if (y == null) {
      this.x = x
      this.y = x
    } else {
      this.x = x
      this.y = y
    }
  }

  static ZERO = new Vector2(0, 0)
  static SCREEN = new Vector2(192, 112)
  static UNIT = 10

  add(vector2: Vector2) {
    return new Vector2(this.x + vector2.x, this.y + vector2.y)
  }
  multiply(vector2: Vector2 | number) {
    if (typeof vector2 === 'number') {
      return new Vector2(this.x * vector2, this.y * vector2)
    }
    return new Vector2(this.x * vector2.x, this.y * vector2.y)
  }
}
