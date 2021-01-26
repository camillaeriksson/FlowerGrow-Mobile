import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height;

const GroundPhysics = (entities) => {
  let pot = entities.pot.body;
  let grass = entities.grass.body;

  // Making the grass and pot static if they go off screen, so that they don't keep moving downwards forever
  if (grass.position.y > max_height + 100) {
    Matter.Body.setStatic(grass, true);
  } if (pot.position.y > max_height + 100) {
    Matter.Body.setStatic(pot, true);
  }

  return entities;
}

export default GroundPhysics;