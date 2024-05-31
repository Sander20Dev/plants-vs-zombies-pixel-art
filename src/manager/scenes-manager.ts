import Scene from '../scenes/_scene'
import { Views } from '../game-engine/lib/loader'
import { selectedPlant, suns } from '../states'
import { defaultLoadingSeeds, loadingSeeds } from '../utilities/enums/plants'
import { clearAudios } from '../game-engine/utilities/media-manager/media-storage'

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
    Views.clean()

    new scene(...(props as ConstructorParameters<typeof Scene>))
    this.currentScene = scene
    this.lastProps = props

    loadingSeeds.current = structuredClone(defaultLoadingSeeds)
    suns.current = 50
    selectedPlant.current = null
  }
}

export const scenes = new ScenesManager()
