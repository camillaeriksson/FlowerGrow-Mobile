import Matter from 'matter-js'
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let badCloud = entities.badCloud.body;
  let flower = entities.flower.body;

  touches.filter(t => t.type === 'press').forEach(t => {
    console.log('HEJ', t.event.locationX)
    if (t.event.locationX < max_width / 2) {
      Matter.Body.translate(flower, { x: -5, y: 0 });
    } else if (t.event.locationX > max_width / 2) {
      Matter.Body.translate(flower, { x: 5, y: 0 });
    }
  });

  Matter.Body.translate(badCloud, { x: 0, y: 1 });

  Matter.Engine.update(engine, time.delta); 

  return entities;
}

export default Physics;