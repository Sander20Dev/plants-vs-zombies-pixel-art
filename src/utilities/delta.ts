import Time from '../game-engine/utilities/time'

export class Counter {
  timer = 0
  end = true

  constructor(public seconds: number, public cb: () => void) {}

  play() {
    this.end = false
  }

  restart() {
    this.timer = 0
    this.end = false
  }

  updater() {
    if (this.end) return

    this.timer += Time.deltaTime
    if (this.timer >= this.seconds) {
      this.cb()
      this.end = true
    }
  }
}
