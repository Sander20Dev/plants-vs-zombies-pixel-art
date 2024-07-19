import { loadAllMedia } from '../../game-engine/utilities/media-manager/media/load'
import { scenes } from '../../manager/scenes-manager'
import Scene from '../_scene'
import TestMap from './map.test'

export default class TestScene extends Scene {
  constructor() {
    loadAllMedia().then(() => {
      scenes.changeScene(TestMap)
    })
    super([])
  }
}
