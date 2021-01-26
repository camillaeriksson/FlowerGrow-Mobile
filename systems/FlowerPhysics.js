import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;
const min_width = 0;
let steerFlower = false;

const FlowerPhysics = (entities, { touches }) => {
  let flower = entities.flower.body;
  let waterLevel = entities.waterMeter.waterLevel;
  let engine = entities.physics.engine;
  let total_seconds = parseInt(Math.floor(engine.timing.timestamp / 1000));
  
  // Make the flower move up as long as it's under half of the screen
  if (flower.position.y >= max_height / 2) {
    Matter.Body.translate(flower, { x: 0, y: -4 });
  } else {
    steerFlower = true;
  }

  //Change from bud to flower at 2 sec
  if (total_seconds === 2) {
    entities.flower.flowerNumber = 100;
  }

  
  // Moving the flower by touches on the screen
  if (steerFlower) {
    touches.filter(t => t.type === 'move').forEach(t => {
      let touchEvent = t.delta.pageX;
      const flowerRadius = 30;
        Matter.Body.translate(flower, { x: touchEvent, y: 0 });
      if (flower.position.x + flowerRadius > max_width) {
        Matter.Body.setPosition(flower, { x: max_width - flowerRadius, y: flower.position.y });
      } if (flower.position.x - flowerRadius < min_width) {
        Matter.Body.setPosition(flower, { x: min_width + flowerRadius, y: flower.position.y });
      }
    });
  }
  
  // Check the start of collisions and changing the flowers face
  Matter.Events.on(engine, 'collisionStart', (event) => {
    for (var i = 0; i < event.pairs.length; i++) {
      let pairs = event.pairs[i];
      if (pairs.bodyA.collisionFilter.group === 5 && pairs.bodyB.collisionFilter.group === -5) {
      entities.flower.flowerNumber = 'hurt';
      } if (pairs.bodyA.collisionFilter.group === 5 && pairs.bodyB.collisionFilter.group === -4) {
      entities.flower.flowerNumber = 100;
      }
    }
  })

  // Check the end of collisions and changing the flowers face depending on water level
  Matter.Events.on(engine, 'collisionEnd', (event) => {
    if (waterLevel === 160) {
      entities.flower.flowerNumber = 100;
    }
    if (waterLevel <= 128) {
      entities.flower.flowerNumber = 75;
    }
    if (waterLevel <= 64) {
      entities.flower.flowerNumber = 25;
    }
    if (waterLevel <= 32) {
      entities.flower.flowerNumber = 0;
    }
  })

  return entities;

}

export default FlowerPhysics;