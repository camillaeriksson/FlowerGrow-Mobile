import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import Flower from '../components/Flower';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;
const min_width = 0;

export const updateFlower = (world, entities, flowerNumber) => {

  let flower = Matter.Bodies.rectangle(max_width / 2, max_height / 2, 60, 60, {isStatic: true});

  Matter.World.add(world, [flower]);

  entities['flower'] = { 
    body: flower, 
    size: [60, 60],
    flowerNumber: flowerNumber,
    renderer: Flower 
  }

  flower.collisionFilter = {
    'group': 5,
    'category': 20,
    'mask': 10
    }
}

const FlowerPhysics = (entities, { touches }) => {
  let flower = entities.flower.body;
  let engine = entities.physics.engine;
  let world = entities.physics.world;
  let total_seconds = parseInt(Math.floor(engine.timing.timestamp / 1000));

  if (total_seconds * 1000 < 1000) {
  // console.log(engine)
  }
  
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


  return entities;
}

export default FlowerPhysics;