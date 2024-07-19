import Time from '../utilities/time'
import { canvas } from '../../utilities/drawing'
import Vector2 from '../utilities/vector2'
import NodeAbs from './node'

let clicker: Clickable[] = []

canvas.addEventListener('click', (ev) => {
  const rect = canvas.getBoundingClientRect()

  const x = Math.floor((Vector2.SCREEN.x * (ev.pageX - rect.x)) / rect.width)
  const y = Math.floor((Vector2.SCREEN.y * (ev.pageY - rect.y)) / rect.height)

  let detect = false

  for (const click of clicker) {
    if (Time.timeRate === 0 && !click.invulnerable) return
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

  const x = Math.floor((Vector2.SCREEN.x * (ev.pageX - rect.x)) / rect.width)
  const y = Math.floor((Vector2.SCREEN.y * (ev.pageY - rect.y)) / rect.height)

  for (const click of clicker) {
    if (Time.timeRate === 0 && !click.invulnerable) return
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
