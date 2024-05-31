import { canvas } from '../../../game-engine/game-object'
import SpriteTexture from '../../../game-engine/utilities/sprite'
import Vector2 from '../../../game-engine/utilities/vector2'
import { scenes } from '../../../manager/scenes-manager'
import { State, UseStates } from '../../../ui/lib'
import Background from '../../../ui/utils/background'
import { PLANTS, allPlants } from '../../../utilities/enums/plants'
import Scene from '../../_scene'
import Day from '../game/day'

function cpx(count: number, px: number) {
  return Math.floor(count * px) + 'px'
}

export default class SelectPlants extends Scene {
  constructor(difficulty: number) {
    setupUI(difficulty)
    super([
      new Background(
        new SpriteTexture('/sprites/ui/maps/day/bg.png'),
        new Vector2(-96, 0)
      ),
    ])
  }
}

function setupUI(difficulty: number) {
  const useStates = new UseStates()

  const pixelSize = new State(canvas.getBoundingClientRect().width / 192)
  window.onresize = () => {
    pixelSize.set(canvas.getBoundingClientRect().width / 192)
  }

  const selectedSeeds = new State<PLANTS[]>([])

  const ui = document.querySelector<HTMLDivElement>('#ui')!
  ui.classList.remove('disabled')

  const style = document.createElement('style')
  ui.appendChild(style)

  const container = document.createElement('div')
  container.classList.add('container')
  ui.appendChild(container)

  const seedContainer = document.createElement('div')
  seedContainer.classList.add('seed-container')
  container.appendChild(seedContainer)

  const seedSelecterBg = document.createElement('div')
  seedSelecterBg.classList.add('seed-selecter-bg')
  container.appendChild(seedSelecterBg)

  const seedSelecter = document.createElement('div')
  seedSelecter.classList.add('seed-selecter')
  seedSelecterBg.appendChild(seedSelecter)

  const seedsToSelect = allPlants.map((plant) => {
    const div = document.createElement('div')
    div.classList.add('seed-to-select')
    div.classList.add(plant)
    div.style.backgroundImage = `url(/sprites/ui/seeds/${plant}.png)`

    div.onclick = () => {
      if (selectedSeeds.current.length >= 6) return
      if (selectedSeeds.current.includes(plant)) return
      selectedSeeds.set([...selectedSeeds.current, plant])
    }

    seedSelecter.appendChild(div)

    return div
  })

  const playButton = document.createElement('button')
  playButton.classList.add('play')
  playButton.disabled = true
  playButton.onclick = () => {
    if (playButton.disabled) return

    scenes.changeScene(Day as unknown as typeof Scene, [
      difficulty,
      selectedSeeds.current,
    ])
  }
  seedSelecterBg.appendChild(playButton)

  useStates.use(() => {
    const px = (n: number) => cpx(n, pixelSize.current)

    style.innerHTML = `
    .container {
      display: flex;
      flex-direction: row;
      background-image: url(/sprites/ui/views/new-game/select-plants/select-plants.png);
      background-repeat: no-repeat;
      background-size: contain;
      image-rendering: pixelated;
      width: 100%;
      height: 100%;
    }
  
    .seed-container {
      display: flex;
      flex-direction: column;
      padding: ${px(8)};
      width: ${px(40)};
      gap: 0px;
    }
    .seed {
      user-select: none;
      image-rendering: pixelated;
      background-repeat: no-repeat;
      background-size: contain;
      width: ${px(24)};
      height: ${px(16)};
    }
    .seed:hover {
      filter: brightness(0.7);
    }

    .seed-selecter-bg {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      width: ${px(78)};
      padding: ${px(20)} ${px(6)} ${px(6)} ${px(6)};
    }
    .seed-selecter {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      max-height: 100%;
      overflow-y: auto;
    }
    .seed-to-select {
      user-select: none;
      image-rendering: pixelated;
      background-repeat: no-repeat;
      background-size: contain;
      width: ${px(12)};
      height: ${px(8)};
    }
    .seed-to-select.active:hover {
      filter: brightness(0.7);
    }
    .seed-to-select.disabled {
      opacity: 70%;
    }
    .play {
      width: ${px(66)};
      height: ${px(24)};
      background-image: url(/sprites/ui/views/new-game/select-plants/start-button.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      image-rendering: pixelated;
      border: 0;
    }
    .play:disabled {
      filter: grayscale(0.5) opacity(0.5);
    }
    .play:enabled:hover {
      filter: brightness(0.7);
    }
    `

    seedsToSelect.forEach((hasSeed) => {
      if (selectedSeeds.current.some((n) => hasSeed.className.includes(n))) {
        if (!hasSeed.classList.contains('disabled'))
          hasSeed.classList.add('disabled')
        if (hasSeed.classList.contains('active'))
          hasSeed.classList.remove('active')
      } else {
        if (hasSeed.classList.contains('disabled'))
          hasSeed.classList.remove('disabled')
        if (!hasSeed.classList.contains('active'))
          hasSeed.classList.add('active')
      }
    })

    seedContainer.innerHTML = ''
    selectedSeeds.current.forEach((plant) => {
      const img = document.createElement('div')
      img.classList.add('seed')
      img.classList.add(plant)
      img.style.backgroundImage = `url(/sprites/ui/seeds/${plant}.png)`
      img.onclick = () => {
        selectedSeeds.set(selectedSeeds.current.filter((n) => n !== plant))
      }

      seedContainer.appendChild(img)
    })

    if (selectedSeeds.current.length !== 6) {
      playButton.disabled = true
    } else {
      playButton.disabled = false
    }
  }, [pixelSize, selectedSeeds])
}
