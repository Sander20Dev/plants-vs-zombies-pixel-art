import { setUpUI, ui } from '../../library'
import { scenes } from '../../manager/scenes-manager'
import { State, UseStates } from '../../ui/lib'
import { loadAllMedia } from '../../game-engine/utilities/media-manager/media/load'
import Scene from '../_scene'
import Lobby from '../lobby'

export default class StartingLoad extends Scene {
  constructor() {
    const isLoad = new State(false)

    setUpUI()
    const bg = document.createElement('div')
    bg.style.display = 'grid'
    bg.style.placeContent = 'center'
    bg.style.backgroundColor = '#fff'
    bg.style.width = '100%'
    bg.style.height = '100%'
    ui.appendChild(bg)

    const loading = document.createElement('div')
    loading.style.border = '10px solid black'
    loading.style.borderRightColor = 'transparent'
    loading.style.borderRadius = '50%'
    loading.style.width = '100px' /*  */
    loading.style.aspectRatio = '1/1'
    loading.style.animation = 'spin 2s infinite'

    const loadButton = document.createElement('button')
    loadButton.style.backgroundColor = '#000'
    loadButton.style.border = '0'
    loadButton.style.color = '#fff'
    loadButton.style.padding = '8px 16px'
    loadButton.style.borderRadius = '8px'
    loadButton.innerText = 'Load Game'
    loadButton.onclick = () => {
      isLoad.set(true)

      loadAllMedia().then(() => {
        scenes.changeScene(Lobby)
      })
    }

    new UseStates().use(() => {
      loadButton.remove()
      loading.remove()

      if (isLoad.current) {
        bg.appendChild(loading)
      } else {
        bg.appendChild(loadButton)
      }
    }, [isLoad])

    // loadAllMedia().then(() => {
    //   scenes.changeScene(Lobby)
    // })
    super([])
  }
}
