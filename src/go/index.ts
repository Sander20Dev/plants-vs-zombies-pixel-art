import Lobby from '../scenes/lobby'
import { scenes } from '../manager/scenes-manager'

// import SunSpawner from '../classes/controllers/sun-spawner'
// import Scene from '../scenes/_scene'
// import { PLANTS } from '../utilities/enums/plants'
// import Board from './ui/board'
// import Seeds from './ui/seeds'
// import SunCounter from './ui/sun-counter'
// import Zombie from './zombies/zombie'
// import Vector2 from '../classes/vector2'
// import Plant from './plants/peashooter'
// import ZombieGenerator from '../classes/controllers/zombie-generator'
// import { ZOMBIES } from '../utilities/enums/zombie'
// import { GameObject, ctx } from '../classes/game-object'
// import { GameObjectTypes } from '../utilities/enums'
// import Collision from '../classes/nodes/collider'
// import Time from '../utilities/importants/time'
// import SelectPlants from '../scenes/new-game/select-plants'
// import Day1 from '../scenes/adventure-mode/day/day-1'
// import Map1 from '../scenes/map-1'

// scenes.changeScene(Day1)
// class SceneTest extends Scene {
//   constructor() {
//     const board = new Board(5)

//     super([
//       board,
//       new SunCounter(),
//       new Seeds([PLANTS.PEASHOOTER]),
//       new ZombieGenerator({
//         waves: 3,
//         zombies: [
//           { porcent: 70, wave: 0, zombie: ZOMBIES.ZOMBIE },
//           { porcent: 20, wave: 1, zombie: ZOMBIES.CONEHEAD_ZOMBIE },
//           { porcent: 10, wave: 2, zombie: ZOMBIES.CONEHEAD_ZOMBIE },
//         ],
//         difficultyPerWave: 2,
//       }),
//       new SunSpawner(),
//       new ZombieZida(),
//       new Zombie(new Vector2(192, 40)),
//       new Plant(new Vector2(40, 40)),
//     ])
//   }
// }

// class ZombieZida extends GameObject {
//   constructor() {
//     super(GameObjectTypes.PROJECTIL, new Vector2(40, 24))
//     this.collision = new Collision(
//       this,
//       Vector2.ZERO,
//       new Vector2(80, 80),
//       GameObjectTypes.ZOMBIE,
//       (z) => {
//         ctx.fillStyle = '#0088'
//         ctx.fillRect(
//           z.collision.relativeTransform.x,
//           z.collision.relativeTransform.y,
//           z.collision.scale.x,
//           z.collision.scale.y
//         )
//         // console.log(z.transform);
//         ctx.fillRect(
//           this.collision.relativeTransform.x,
//           this.collision.relativeTransform.y,
//           this.collision.scale.x,
//           this.collision.scale.y
//         )
//         ;(z as Zombie).attack((z as Zombie).health + 100)
//       }
//     )
//   }
// }

// Time.timeRate = 2

scenes.changeScene(Lobby)
