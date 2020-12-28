import Matter from 'matter-js'
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

const BadCloudPhysics = (entities, { time }) => {
  let engine = entities.physics.engine;
  let badCloud = entities.badCloud.body;

  if (badCloud.position.y > max_height) {
    Matter.Body.setPosition(badCloud, { x: badCloud.position.x, y: 0 });
  } else {
    Matter.Body.translate(badCloud, { x: 0, y: 1 });
  }


  Matter.Engine.update(engine, time.delta); 

  return entities;
}

export default BadCloudPhysics;