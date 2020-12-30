import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_width = Dimensions.get('screen').width;
const min_width = 0;

const FlowerPhysics = (entities, { touches }) => {
  let flower = entities.flower.body;

  
  // Function for the touch movement of the flower
  touches.filter(t => t.type === 'move').forEach(t => {
    const flowerDiameter = 76;
  
    if (t.event.locationX < flower.position.x) {
      Matter.Body.translate(flower, { x: -10, y: 0 });
    } if (t.event.locationX > flower.position.x) {
      Matter.Body.translate(flower, { x: 10, y: 0 });
    } if (flower.position.x > max_width - flowerDiameter) {
      flower.position.x = max_width - flowerDiameter;
    } if (flower.position.x < min_width) {
      flower.position.x = min_width;
    }
  });


  return entities;
}

export default FlowerPhysics;