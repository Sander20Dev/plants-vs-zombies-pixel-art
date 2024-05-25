import { scenes } from '../../manager/scenes-manager'
import Scene from '../_scene'
import TestMap from './map.test'

export default class TestScene extends Scene {
  constructor() {
    scenes.changeScene(TestMap)
    super([])
  }
}
