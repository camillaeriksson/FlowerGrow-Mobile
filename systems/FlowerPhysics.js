import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_width = Dimensions.get('screen').width;

const FlowerPhysics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let flower = entities.flower.body;

  touches.filter(t => t.type === 'press').forEach(t => {
    if (t.event.locationX < max_width / 2) {
      Matter.Body.translate(flower, { x: -5, y: 0 });
    } else if (t.event.locationX > max_width / 2) {
      Matter.Body.translate(flower, { x: 5, y: 0 });
    }
  });

  Matter.Engine.update(engine, time.delta); 

  return entities;
}

export default FlowerPhysics;