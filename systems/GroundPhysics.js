import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').height;

const GroundPhysics = (entities) => {
  let pot = entities.pot.body;
  let grass = entities.grass.body;

  if (grass.position.y > max_height + 100) {
    Matter.Body.setStatic(grass, true)
  } if (pot.position.y > max_height + 100) {
    Matter.Body.setStatic(pot, true)
  }

  return entities;
}

export default GroundPhysics;