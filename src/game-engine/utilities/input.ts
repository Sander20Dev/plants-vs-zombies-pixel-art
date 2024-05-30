import Vector2 from './vector2'

const waitingInputs: Record<string, boolean | undefined> = {}
let wKeydown: string[] = []

window.onkeydown = (ev) => {
  waitingInputs[ev.key] = true

  wKeydown.push(ev.key)
}
window.onkeyup = (ev) => {
  waitingInputs[ev.key] = false
}

export default class Input {
  static isKeyDown(key: string) {
    return inputController.keydown[key] ?? false
  }
  static isKeyPressed(key: string) {
    return waitingInputs[key] ?? false
  }

  keydown: Record<string, boolean | undefined> = {}
  mousePos = Vector2.ZERO

  update() {
    for (const key in this.keydown) {
      if (Object.prototype.hasOwnProperty.call(this.keydown, key)) {
        this.keydown[key] = false
      }
    }
    for (const key of wKeydown) {
      this.keydown[key] = true
    }
    wKeydown = []
  }
}

export const inputController = new Input()
