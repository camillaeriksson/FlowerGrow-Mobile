import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import GoodCloud from '../components/GoodCloud';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

// Function for getting a random number between min and max
const randomizeNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function for creating a goodCloud matter body at random position, adding it to the world and to the entites, and adding collision filter
const spawnGoodClouds = (world, entities) => {

  let goodCloud = Matter.Bodies.rectangle(randomizeNumber(0, max_width - 60), randomizeNumber(0, -max_height), 117, 110, {isSensor: true });

  Matter.World.add(world, [goodCloud]);

  entities["goodCloud"] = {
    body: goodCloud,
    size: [117, 110],
    renderer: GoodCloud
  }

  goodCloud.collisionFilter = {
    'group': -4,
    'category': 10,
    'mask': 20
  }
}

const GoodCloudPhysics = (entities) => {
  let world = entities.physics.world;
  let engine = entities.physics.engine;
  let total_time = parseInt(Math.floor(engine.timing.timestamp));

    // Spawning a cloud at around 2 sec (can't put a whole second since the engine updates many times during one sec)
    if (total_time > 2100 && total_time < 2135){
      spawnGoodClouds(world, entities);
    }

    // Going through the clouds and resetting their upper position if they go off screen
    Object.keys(entities).forEach(key => {
      if (key.indexOf("goodCloud") === 0) {
        if (entities[key].body.position.y > max_height + 200) {
          Matter.Body.setPosition(entities[key].body, {
            x: randomizeNumber(0, max_width - 60), 
            y: randomizeNumber(0, -max_height)});
        }
      }
    });

  return entities;

}

export default GoodCloudPhysics;