import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height;

const PotPhysics = (entities) => {
  let pot = entities.pot.body;
  let grass = entities.grass.body;

  Matter.Body.translate(pot, { x: 0, y: 1 });
  Matter.Body.translate(grass, { x: 0, y: 1 });
  if (grass.position.y > max_height + 200) {
    grass.position.y = max_height + 200;
  } if (pot.position.y > max_height + 200) {
    pot.position.y = max_height + 200;
  }

  return entities;
}

export default PotPhysics;