import Scene from '../scenes/_scene'
import { Views } from '../loader'
import { selectedPlant, suns } from '../states'
import {
  PLANTS,
  defaultLoadingSeeds,
  loadingSeeds,
} from '../utilities/enums/plants'
import { clearAudios } from '../utilities/media-storage'

class ScenesManager {
  currentScene: typeof Scene | null = null
  lastProps: unknown[] | null = null

  reloadScene() {
    if (this.currentScene) {
      this.changeScene(this.currentScene, this.lastProps ?? undefined)
    }
  }

  changeScene<T extends typeof Scene>(scene: T, props: unknown[] = []) {
    const ui = document.querySelector('#ui')!
    ui.innerHTML = ''
    if (!ui.classList.contains('disabled')) {
      ui.classList.add('disabled')
    }

    clearAudios()
    suns.current = 0
    selectedPlant.current = null
    for (const plant in defaultLoadingSeeds) {
      if (Object.prototype.hasOwnProperty.call(defaultLoadingSeeds, plant)) {
        loadingSeeds[plant as PLANTS] = defaultLoadingSeeds[plant as PLANTS]
      }
    }
    Views.clean()

    new scene(...(props as ConstructorParameters<typeof Scene>))
    this.currentScene = scene
    this.lastProps = props
  }
}

export const scenes = new ScenesManager()
