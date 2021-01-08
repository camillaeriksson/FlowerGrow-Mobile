import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;
const min_width = 0;

const FlowerPhysics = (entities, { touches }) => {
  let flower = entities.flower.body;
  let stem = entities.stem.body;
  let engine = entities.physics.engine;
  let total_seconds = parseInt(Math.floor(engine.timing.timestamp / 1000));

  if (total_seconds < 2) {
    Matter.Body.translate(flower, { x: 0, y: -4 });
  }
  
  // Function for the touch movement of the flower
  touches.filter(t => t.type === 'move').forEach(t => {
    let touchEvent = t.delta.pageX
    const flowerRadius = 30;
      Matter.Body.translate(flower, { x: touchEvent, y: 0 });
    if (flower.position.x + flowerRadius > max_width) {
      Matter.Body.setPosition(flower, { x: max_width - flowerRadius, y: flower.position.y });
    } if (flower.position.x - flowerRadius < min_width) {
      Matter.Body.setPosition(flower, { x: min_width + flowerRadius, y: flower.position.y });
    }
  });


  Matter.Vertices.create([{ x: 0, y: 1 }, { x: 25, y: 50 }, { x: 0, y: 10 }], stem)

 // console.log('stjälk', stem)

  return entities;
}

export default FlowerPhysics;