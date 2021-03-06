import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import Bee from '../components/Bee';

const max_height = Math.floor(Dimensions.get('screen').height);
const max_width = Math.floor(Dimensions.get('screen').width);

// Arrays containing possible starting positions for bee
let beeStartingPointX = [0, max_width];
let beeStartingPointY = [-max_height, -max_height / 2, max_height + 5, max_height * 1.5];

let bees = 0;

// Function for resetting bees
export const resetBees = () => {
  bees = 0;
}

// Function for creating a bee matter body at random position, adding it to the world and to the entites, and adding collision filter
const spawnBees = (world, entities) => {
  
  // Randomizing starting point for bee
  let beeStartingPointXToUse = beeStartingPointX[Math.floor(Math.random() * beeStartingPointX.length)];
  let beeStartingPointYToUse = beeStartingPointY[Math.floor(Math.random() * beeStartingPointY.length)];
  
  let bee = Matter.Bodies.rectangle(beeStartingPointXToUse, beeStartingPointYToUse, 60, 60, {isSensor: true});

  Matter.World.add(world, [bee]);

  entities['bee' + (bees + 1)] = {
    body: bee,
    size: [60, 60],
    beeDirection: 'right',
    beeHitFlower: false,
    beeIsDead: false,
    renderer: Bee
  }

  bees += 1;

  bee.collisionFilter = {
    'group': -5,
    'category': 10,
    'mask': 20
  }
}

const BeePhysics = (entities, {touches, dispatch}) => {
  let world = entities.physics.world;
  let engine = entities.physics.engine;
  let total_time = parseInt(Math.floor(engine.timing.timestamp));
  let flower = entities.flower.body;
  let flowerPositionX = Math.floor(flower.position.x);
  let flowerPositionY = Math.floor(flower.position.y);
  let beeStartingPointXToUse = beeStartingPointX[Math.floor(Math.random() * beeStartingPointX.length)];
  let beeStartingPointYToUse = beeStartingPointY[Math.floor(Math.random() * beeStartingPointY.length)];


  // Spawning a bee at around 2 sec (can't put a whole second since the engine updates many times during one sec)
  if (total_time > 2100 && total_time < 2135) {
    spawnBees(world, entities);
  }

  // Spawn one more bee at around 40 sec
  if (total_time > 40000 && total_time < 40035) {
    spawnBees(world, entities);
  }

  // Loop through all the bees and moving them depending on current position
  // and dispatch for palying sounds
  Object.keys(entities).forEach(key => {
    
    let maxHeight = Math.floor(max_height);
    // Arrays for possible bee positions, since it moves by random 5 steps at a time
    // and might not be at exactly 0 or max_height when entering screen
    let possibleBeeYPositionsOverScreen = [0, 1, 2, 3, 4];
    let possibleBeeYPositionsUnderScreen = [maxHeight, maxHeight-1, maxHeight-2, maxHeight-3, maxHeight-4];
    // Checking for first bee
    if (key === 'bee1') {
      let firstBeePositionY = Math.floor(entities[key].body.position.y);
      // If first bee enters screen
      if (possibleBeeYPositionsOverScreen.indexOf(firstBeePositionY) > -1 || possibleBeeYPositionsUnderScreen.indexOf(firstBeePositionY) > -1) {
        dispatch({ type: 'first_bee_enters_screen' });
      }
      // If first bee is off screen or dead
      if (firstBeePositionY < 0 || firstBeePositionY > Math.floor(max_height) || entities[key].beeIsDead) {
        dispatch({ type: 'first_bee_leaves_screen' });
      }
    }
    // Checking for second bee
    if (key === 'bee2') {
      let secondBeePositionY = Math.floor(entities[key].body.position.y);
      // If second bee enters screen
      if (possibleBeeYPositionsOverScreen.indexOf(secondBeePositionY) > -1 || possibleBeeYPositionsUnderScreen.indexOf(secondBeePositionY) > -1) {
        dispatch({ type: 'second_bee_enters_screen' });
      }
      // If second bee is off screen or dead
      if (secondBeePositionY < 0 || secondBeePositionY > Math.floor(max_height) || entities[key].beeIsDead) {
        dispatch({ type: 'second_bee_leaves_screen' });
      }
    }
    
    if (key.indexOf('bee') === 0) {
      let beePositionX = Math.floor(entities[key].body.position.x);
      let beePositionY = Math.floor(entities[key].body.position.y);
      let bee = entities[key];
      let beePointsToMoveTo = [1, 5];
      let beeShakeYPoint = beePointsToMoveTo[Math.floor(Math.random() * beePointsToMoveTo.length)];

      // Check for press on bee
      touches.filter(t => t.type === 'press').forEach(t => {
        let touchX = Math.floor(t.event.pageX);
        let touchY = Math.floor(t.event.pageY);
        let beeMinX = beePositionX - 30;
        let beeMaxX = beePositionX + 30;
        let beeMinY = beePositionY - 30;
        let beeMaxY = beePositionY + 30;
        if (touchX <= beePositionX && touchX >= beeMinX && touchY <= beePositionY && touchY >= beeMinY ||
          touchX >= beePositionX && touchX <= beeMaxX && touchY >= beePositionY && touchY <= beeMaxY) {
          bee.beeDirection = 'dead';
          bee.beeIsDead = true;
        }
      });

      // If bee is dead it will fall down with translation only
      if (bee.beeIsDead) {
        Matter.Body.translate(bee.body, {
          x: 0,
          y: 15
        });
        bee.body.collisionFilter = {
          'group': 7
        }
      }

      // Put collisionfilter back if bee is not dead
      if (!bee.beeIsDead) {
        bee.body.collisionFilter = {
          'group': -5,
          'category': 10,
          'mask': 20
        } 
      }
      
      // If bee is dead and falls out of screen
      if (bee.beeIsDead && beePositionY > max_height ) {
        Matter.Body.setPosition(bee.body, {
          x: beeStartingPointXToUse, 
          y: beeStartingPointYToUse
        });
        bee.beeIsDead = false;
      }
      
      // Applies force to the bee upwards in the same pace as the gravity, since the bee can't be static
      Matter.Body.applyForce(bee.body, bee.body.position, { x: bee.body.mass * 0, y: -(bee.body.mass * engine.world.gravity.y) / 1000 });
      
      if (!bee.beeIsDead) {
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
              });
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
                });
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
                });
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
            Matter.Body.setPosition(bee.body, {
              x: beeStartingPointXToUse, 
              y: beeStartingPointYToUse
            });
          }
        }
      }
    }
  });

  return entities;
  
}

export default BeePhysics;