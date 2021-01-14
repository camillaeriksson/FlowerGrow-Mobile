import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import BadCloud from '../components/BadCloud';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

let badClouds = 0;

// Function for getting a random number between min and max
const randomizeNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function for creating a badCloud matter body, adding it to the world and to the entites, and adding collision filter
const spawnBadClouds = (world, entities) => {

  let badCloud = Matter.Bodies.rectangle(randomizeNumber(0, max_width), randomizeNumber(-30, -max_height), 117, 60, {isSensor: true });

  Matter.World.add(world, [badCloud]);

  let cloudNumber = randomizeNumber(1, 3)

  entities["badCloud" + (badClouds + 1)] = {
    body: badCloud,
    size: [117, 60],
    cloudNumber: cloudNumber,
    renderer: BadCloud
  }

  badClouds += 1;

  badCloud.collisionFilter = {
    'group': -5,
    'category': 10,
    'mask': 20
  }
}

const BadCloudPhysics = (entities) => {
  let world = entities.physics.world;
  let engine = entities.physics.engine;
  let total_time = parseInt(Math.floor(engine.timing.timestamp));

  // Spawning four clouds at around 2 sec (can't put a whole second since the engine updates many times during one sec)
  if (total_time > 2100 && total_time < 2135){
    spawnBadClouds(world, entities);
    spawnBadClouds(world, entities);
    spawnBadClouds(world, entities);
    spawnBadClouds(world, entities);
  }

  // Going through the clouds and resetting their upper position if they go off screen
  Object.keys(entities).forEach(key => {
    if (key.indexOf("badCloud") === 0) {
      if (entities[key].body.position.y > max_height + 200) {
        Matter.Body.setPosition(entities[key].body, {
          x: randomizeNumber(0, max_width), 
          y: randomizeNumber(-30, -max_height)
        });
      }
    }
  });

  return entities;
  
}

export default BadCloudPhysics;