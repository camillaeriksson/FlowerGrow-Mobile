import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import GoodCloud from '../components/GoodCloud';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

const randomizeNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const spawnGoodClouds = (world, entities) => {

  let goodCloud = Matter.Bodies.rectangle(randomizeNumber(0, max_width - 60), randomizeNumber(0, -max_height), 117, 60, {isSensor: true });

  Matter.World.add(world, [goodCloud]);

  entities["goodCloud"] = {
    body: goodCloud,
    size: [117, 60],
    color: 'green',
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

    if (total_time > 2100 && total_time < 2135){
      spawnGoodClouds(world, entities);
    }

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