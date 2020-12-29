import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_width = Dimensions.get('screen').width;

const PotPhysics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let pot = entities.pot.body;
  let grass = entities.grass.body;

  Matter.Body.translate(pot, { x: 0, y: 1 });
  Matter.Body.translate(grass, { x: 0, y: 1 });

  Matter.Engine.update(engine, time.delta); 

  return entities;
}

export default PotPhysics;