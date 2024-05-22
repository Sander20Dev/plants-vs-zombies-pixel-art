export class State<T> {
  current: T
  #cbs: (() => void)[] = []

  constructor(value: T) {
    this.current = value
  }

  set(value: T) {
    this.current = value

    for (const cb of this.#cbs) {
      cb()
    }
  }

  use(cb: () => void) {
    this.#cbs.push(cb)
  }
}

export class UseStates {
  constructor() {}

  use<T extends State<any>[]>(cb: () => void, states: T) {
    for (const state of states) {
      state.use(cb)
    }

    cb()
  }
}
