import Vector2 from '../game-engine/utilities/vector2'

export const canvas = document.querySelector('canvas')!
canvas.width = 1920
canvas.height = 1120

export const ctx = canvas.getContext('2d')!
ctx.imageSmoothingEnabled = false
ctx.scale(Vector2.UNIT, Vector2.UNIT)
