import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;
const min_width = 0;

const FlowerPhysics = (entities, { touches }) => {
  let flower = entities.flower.body;
  // Function for the touch movement of the flower
  // touches.filter(t => t.type === 'move').forEach(t => {
  //   const flowerDiameter = 76;
  //     Matter.Body.setPosition(flower, { x: t.event.locationX - 38, y: max_height / 2 });
    // if (flower.position.x > max_width - flowerDiameter) {
    //   Matter.Body.setPosition(flower, { x: max_width / 2 - flowerDiameter, y: max_height / 2});
    // } if (flower.position.x < min_width) {
    //   Matter.Body.setPosition(flower, { x: min_width / 2, y: max_height / 2});
    // }
  // });
  touches.filter(t => t.type === "press").forEach(t => {
    Matter.Body.setVelocity( flower, {
      x: flower.velocity.x,
      y: -5
  });
  });


  return entities;
}

export default FlowerPhysics;