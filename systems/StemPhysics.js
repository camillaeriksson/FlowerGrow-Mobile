import Matter from 'matter-js';

const StemPhysics = (entities) => {
  let flower = entities.flower.body;
  let stem = entities.stem.body;
  const flowerRadius = 30;
  const halfStemHeight = 800/2;

  // Make the stem keep the position with the flower 
  //and grow up with it on start
  Matter.Body.setPosition(stem, {x: flower.position.x, y: flower.position.y + halfStemHeight + flowerRadius});

  return entities;

}

export default StemPhysics;
