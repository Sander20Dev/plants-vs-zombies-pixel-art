import { ctx } from '../game-engine/game-object'
import Vector2 from '../game-engine/utilities/vector2'
import { getImage } from '../game-engine/utilities/media-manager/media-storage'

const charsImg = getImage('/sprites/ui/characters.png')

const charsPos: Record<
  string,
  { pos: { x: number; y: number }; size: { x: number; y: number } } | null
> = {
  '0': {
    pos: {
      x: 0,
      y: 0,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  '1': {
    pos: {
      x: 3,
      y: 0,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  '2': {
    pos: {
      x: 6,
      y: 0,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  '3': {
    pos: {
      x: 9,
      y: 0,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  '4': {
    pos: {
      x: 12,
      y: 0,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  '5': {
    pos: {
      x: 15,
      y: 0,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  '6': {
    pos: {
      x: 18,
      y: 0,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  '7': {
    pos: {
      x: 21,
      y: 0,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  '8': {
    pos: {
      x: 24,
      y: 0,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  '9': {
    pos: {
      x: 27,
      y: 0,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  A: {
    pos: {
      x: 0,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  B: {
    pos: {
      x: 3,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  C: {
    pos: {
      x: 6,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  D: {
    pos: {
      x: 9,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  E: {
    pos: {
      x: 12,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  F: {
    pos: {
      x: 15,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  G: {
    pos: {
      x: 18,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  H: {
    pos: {
      x: 21,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  I: {
    pos: {
      x: 24,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  J: {
    pos: {
      x: 27,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  K: {
    pos: {
      x: 30,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  L: {
    pos: {
      x: 33,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  M: {
    pos: {
      x: 36,
      y: 5,
    },
    size: {
      x: 5,
      y: 5,
    },
  },
  N: {
    pos: {
      x: 41,
      y: 5,
    },
    size: {
      x: 5,
      y: 5,
    },
  },
  O: {
    pos: {
      x: 46,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  P: {
    pos: {
      x: 49,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  Q: {
    pos: {
      x: 52,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  R: {
    pos: {
      x: 55,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  S: {
    pos: {
      x: 58,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  T: {
    pos: {
      x: 61,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  U: {
    pos: {
      x: 64,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  V: {
    pos: {
      x: 67,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  W: {
    pos: {
      x: 70,
      y: 5,
    },
    size: {
      x: 5,
      y: 5,
    },
  },
  X: {
    pos: {
      x: 75,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  Y: {
    pos: {
      x: 78,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  Z: {
    pos: {
      x: 81,
      y: 5,
    },
    size: {
      x: 3,
      y: 5,
    },
  },
  '´': {
    pos: { x: 63, y: 2 },
    size: { x: 3, y: 2 },
  },
}

const specialChar: Record<string, { from: string; to: string } | null> = {
  Á: { from: 'A', to: '´' },
  É: { from: 'E', to: '´' },
  Í: { from: 'I', to: '´' },
  Ó: { from: 'O', to: '´' },
  Ú: { from: 'U', to: '´' },
}

export function drawCharacter(chars: string, pos: Vector2) {
  let currentX = 0
  for (let i = 0; i < chars.length; i++) {
    const char = charsPos[chars[i]]
    if (char == null) {
      const asSpecial = specialChar[chars[i]]
      if (asSpecial != null) {
        drawSpecialChar(asSpecial, pos, currentX)
        currentX += charsPos[asSpecial.from]!.size.x + 1
        continue
      }
      currentX += 4
      continue
    }
    ctx.drawImage(
      charsImg,
      char.pos.x,
      char.pos.y,
      char.size.x,
      char.size.y,
      pos.x + currentX,
      pos.y,
      char.size.x,
      char.size.y
    )
    currentX += char.size.x + 1
  }
}
function drawSpecialChar(
  { from, to }: { from: string; to: string },
  pos: Vector2,
  currentX: number
) {
  const fromChar = charsPos[from]!
  const toChar = charsPos[to]!

  ctx.drawImage(
    charsImg,
    toChar.pos.x,
    toChar.pos.y,
    toChar.size.x,
    toChar.size.y,
    pos.x + currentX + (fromChar.size.x - 1) / 2 - (toChar.size.x - 1) / 2,
    pos.y - toChar.size.y - 1,
    toChar.size.x,
    toChar.size.y
  )
  ctx.drawImage(
    charsImg,
    fromChar.pos.x,
    fromChar.pos.y,
    fromChar.size.x,
    fromChar.size.y,
    pos.x + currentX,
    pos.y,
    fromChar.size.x,
    fromChar.size.y
  )
}
