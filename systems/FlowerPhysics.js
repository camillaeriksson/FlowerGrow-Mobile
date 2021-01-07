import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;
const min_width = 0;

const FlowerPhysics = (entities, { touches }) => {
  let flower = entities.flower.body;
  // Function for the touch movement of the flower
  touches.filter(t => t.type === 'move').forEach(t => {
    const flowerDiameter = 60;
      Matter.Body.setPosition(flower, { x: t.event.locationX, y: max_height / 2 });
    if (flower.position.x - 30 > max_width) {
      Matter.Body.setPosition(flower, { x: max_width - 30, y: max_height / 2});
    } if (flower.position.x < min_width) {
      Matter.Body.setPosition(flower, { x: min_width, y: max_height / 2});
    }
    // console.log('max wodth: ', max_width)
    // console.log('flower positon: ', flower.position.x)
    // console.log('touch: ', t.event.locationX)
  });


  return entities;
}

export default FlowerPhysics;