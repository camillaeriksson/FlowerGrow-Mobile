import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import Bee from '../components/Bee';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

// Arrays containing possible starting positions for bee
let beeStartingPointX = [0, max_width];
let beeStartingPointY = [0, max_height];

let bees = 0;

// Function for creating a bee matter body at random position, adding it to the world and to the entites, and adding collision filter
const spawnBees = (world, entities) => {

  let beeStartingPointXToUse = beeStartingPointX[Math.floor(Math.random() * beeStartingPointX.length)];
  let beeStartingPointYToUse = beeStartingPointY[Math.floor(Math.random() * beeStartingPointY.length)];

  let bee = Matter.Bodies.rectangle(beeStartingPointXToUse, beeStartingPointYToUse, 40, 40, {isSensor: true});

  Matter.World.add(world, [bee]);

  entities["bee" + (bees + 1)] = {
    body: bee,
    size: [40, 40],
    beeDirection: 'right',
    beeHitFlower: false,
    renderer: Bee
  }

  bees += 1;

  bee.collisionFilter = {
    'group': -5,
    'category': 10,
    'mask': 20
  }
}

const BeePhysics = (entities) => {
  let world = entities.physics.world;
  let engine = entities.physics.engine;
  let total_time = parseInt(Math.floor(engine.timing.timestamp));
  let flower = entities.flower.body;
  let flowerPositionX = Math.floor(flower.position.x);
  let flowerPositionY = Math.floor(flower.position.y);
  let beeStartingPointXToUse = beeStartingPointX[Math.floor(Math.random() * beeStartingPointX.length)];
  let beeStartingPointYToUse = beeStartingPointY[Math.floor(Math.random() * beeStartingPointY.length)];

  // Spawning a bee at around 2 sec (can't put a whole second since the engine updates many times during one sec)
  if (total_time > 2100 && total_time < 2135){
    spawnBees(world, entities);
  }

  // Loop through all the bees and moving them depending on current position
  Object.keys(entities).forEach(key => {
    if (key.indexOf("bee") === 0) {
      let beePositionX = Math.floor(entities[key].body.position.x);
      let beePositionY = Math.floor(entities[key].body.position.y);
      let bee = entities[key];
      let beePointsToMoveTo = [1, 5];
      let beeShakeYPoint = beePointsToMoveTo[Math.floor(Math.random() * beePointsToMoveTo.length)];

      // Applies force to the bee upwards in the same pace as the gravity, since the bee can't be static
      Matter.Body.applyForce(bee.body, bee.body.position, { x: bee.body.mass * 0, y: -(bee.body.mass * engine.world.gravity.y) / 1000 })
      
      // If the bee hasn't hit the flower
      if (!bee.beeHitFlower) {
        // If bee and flower have same x position
        if (beePositionX === flowerPositionX) {
          // If bee and flower has same x and y position
          if (beePositionY === flowerPositionY) {
            bee.beeHitFlower = true
          }
          // If bee is under flower
          if (beePositionY <= flowerPositionY) {
            Matter.Body.translate(bee.body, {
              x: 0,
              y: beeShakeYPoint
            })
          } else {
            // If bee is over flower
            Matter.Body.translate(bee.body, {
              x: 0,
              y: -beeShakeYPoint
            });
          }
          // If bee and flower dosen't have same x position
        } else {
          // If bee is under flower
          if (beePositionY <= flowerPositionY) {
            // If bee is to the left of flower
            if (beePositionX <= flowerPositionX) {
              bee.beeDirection = 'right'
              Matter.Body.translate(bee.body, {
                x: +1,
                y: beeShakeYPoint
              })
            // If bee is to the right of flower
            } else {
              bee.beeDirection = 'left'
              Matter.Body.translate(bee.body, {
                x: -1,
                y: beeShakeYPoint
              });
            }
          // If bee is over flower
          } else {
            // If bee is to the left of flower
            if (beePositionX <= flowerPositionX) {
              bee.beeDirection = 'right'
              Matter.Body.translate(bee.body, {
                x: +1,
                y: -beeShakeYPoint
              })
            // If bee is to the right of flower
            } else {
              bee.beeDirection = 'left'
              Matter.Body.translate(bee.body, {
                x: -1,
                y: -beeShakeYPoint
              });
            }
          }
        }
      // If the bee hits the flower  
      } else {
        if (bee.beeDirection === 'right') {
          Matter.Body.translate(bee.body, {
            x: +2,
            y: -beeShakeYPoint
          });
        } else {
          Matter.Body.translate(bee.body, {
            x: -2,
            y: -beeShakeYPoint
          });
        }
        // If bee goes off screen
        if (beePositionX < 0 || beePositionX > max_width) {
          bee.beeHitFlower = false;
          Matter.Body.setPosition(entities[key].body, {
            x: beeStartingPointXToUse, 
            y: beeStartingPointYToUse
          });
        }
      }
    }
  });

  return entities;
  
}

export default BeePhysics;