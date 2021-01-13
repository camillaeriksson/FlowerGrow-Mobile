import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import Bee from '../components/Bee';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

let bees = 0;

 // Function for creating a bee at random position and adding it to the world
const spawnBees = (world, entities) => {

  let beeStartingPointX = [0, max_width];
  let beeStartingPointXToUse = beeStartingPointX[Math.floor(Math.random() * beeStartingPointX.length)]

  let beeStartingPointY = [0, max_height];
  let beeStartingPointYToUse = beeStartingPointY[Math.floor(Math.random() * beeStartingPointY.length)]

  let bee = Matter.Bodies.rectangle(beeStartingPointXToUse, beeStartingPointYToUse, 40, 40, {isStatic: true});

  Matter.World.add(world, [bee]);

  entities["bee" + (bees + 1)] = {
    body: bee,
    size: [40, 40],
    beeDirection: 'right',
    renderer: Bee
  }

  bees += 1;

  // badCloud.collisionFilter = {
  //   'group': -5,
  //   'category': 10,
  //   'mask': 20
  // }

}

const BeePhysics = (entities) => {
  let world = entities.physics.world;
  let engine = entities.physics.engine;
  let total_time = parseInt(Math.floor(engine.timing.timestamp));
  let flower = entities.flower.body;
  let flowerPositionX = Math.floor(flower.position.x)
  let flowerPositionY = Math.floor(flower.position.y)

  // Spawn a bee if time is between the given values
  if (total_time > 2100 && total_time < 2135){
    spawnBees(world, entities);
  }

  // Loop through all the bees and moving them depending on current position
  Object.keys(entities).forEach(key => {
    if (key.indexOf("bee") === 0) {
      // If bee and flower have same x position
      if (entities[key].body.position.x === flowerPositionX) {
        // If bee and flower has same position
        if (entities[key].body.position.y === flowerPositionY) {
          Matter.Body.translate(entities[key].body, {
            x: +2,
            y: +2
          })
        }
        // If bee is under flower
        if (entities[key].body.position.y <= flowerPositionY) {
          Matter.Body.translate(entities[key].body, {
            x: 0,
            y: +1
          })
        } else {
          // If bee is over flower
          Matter.Body.translate(entities[key].body, {
            x: 0,
            y: -1
          });
        }
        // If bee and flower dosen't have same x position
      } else {
        // If bee is under flower
        if (entities[key].body.position.y <= flowerPositionY) {
          // If bee is to the left of flower
          if (entities[key].body.position.x <= flowerPositionX) {
            entities[key].beeDirection = 'right'
            Matter.Body.translate(entities[key].body, {
              x: +1,
              y: +1
            })
          // If bee is to the right of flower
          } else {
            entities[key].beeDirection = 'left'
            Matter.Body.translate(entities[key].body, {
              x: -1,
              y: +1
            });
          }
          // If bee is over flower
        } else {
          // If bee is to the left of flower
          if (entities[key].body.position.x <= flowerPositionX) {
            entities[key].beeDirection = 'right'
            Matter.Body.translate(entities[key].body, {
              x: +1,
              y: -1
            })
            // If bee is to the right of flower
          } else {
            entities[key].beeDirection = 'left'
            Matter.Body.translate(entities[key].body, {
              x: -1,
              y: -1
            });
          }
        }
      }
      // If the bee is at the same position as flower
      // if (entities[key].body.position.x === flowerPositionX && entities[key].body.position.y === flowerPositionY){
      //   Matter.Body.translate(entities[key].body, {
      //     x: +2,
      //     y: +2
      //   });
      // }
    }
  });

  return entities;
  
}

export default BeePhysics;