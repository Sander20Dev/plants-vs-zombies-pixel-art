export default abstract class NodeAbs {
  ignore = true

  draw(): void {}
  update(timeRate?: number): void {}

  destroy() {}
}
