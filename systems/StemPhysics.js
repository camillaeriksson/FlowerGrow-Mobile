import Matter from 'matter-js';

const StemPhysics = (entities) => {
  let flower = entities.flower.body;
  let stem = entities.stem.body;

  Matter.Body.setPosition(stem, {x: flower.position.x, y: flower.position.y + 400});

  return entities;

}

export default StemPhysics;
