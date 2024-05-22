import { paused } from '../../update'
import { canvas } from '../game-object'
import Vector2 from '../vector2'
import NodeAbs from './node'

let clicker: Clickable[] = []

canvas.addEventListener('click', (ev) => {
  const rect = canvas.getBoundingClientRect()

  const x = Math.floor((canvas.width * (ev.pageX - rect.x)) / rect.width)
  const y = Math.floor((canvas.height * (ev.pageY - rect.y)) / rect.height)

  let detect = false

  for (const click of clicker) {
    if (paused && !click.invulnerable) return
    click.onMouseOver()
    if (
      !detect &&
      x >= click.transform.x &&
      y >= click.transform.y &&
      x <= click.transform.x + click.scale.x &&
      y <= click.transform.y + click.scale.y
    ) {
      click.onClick(new Vector2(x, y))
      detect = true
    }
  }
})
canvas.addEventListener('mousedown', (ev) => {
  const rect = canvas.getBoundingClientRect()

  const x = Math.floor((canvas.width * (ev.pageX - rect.x)) / rect.width)
  const y = Math.floor((canvas.height * (ev.pageY - rect.y)) / rect.height)

  for (const click of clicker) {
    if (paused && !click.invulnerable) return
    if (click.onActive == null) continue

    if (
      x >= click.transform.x &&
      y >= click.transform.y &&
      x <= click.transform.x + click.scale.x &&
      y <= click.transform.y + click.scale.y
    ) {
      click.onActive(new Vector2(x, y))
      return
    }
  }
})

export default class Clickable extends NodeAbs {
  invulnerable

  constructor(
    public transform: Vector2,
    public scale: Vector2,
    onClick: (mousePos: Vector2) => void,
    onActive?: (mousePos: Vector2) => void,
    { invulnerable = false } = {}
  ) {
    super()
    clicker.unshift(this)

    this.onClick = onClick
    this.onActive = onActive

    this.invulnerable = invulnerable
  }

  onClick
  onActive
  onMouseOver() {}

  destroy(): void {
    clicker = clicker.filter((n) => n !== this)
  }
}
