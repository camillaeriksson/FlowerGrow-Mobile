import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import BadCloud from '../components/BadCloud';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

let badClouds = 0;

const randomizeNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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

  if (total_time > 2100 && total_time < 2135){
    spawnBadClouds(world, entities);
    spawnBadClouds(world, entities);
    spawnBadClouds(world, entities);
    spawnBadClouds(world, entities);
  }

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