import Matter from 'matter-js';

const FlowerPhysics = (entities, { touches, time }) => {
  let engine = entities.flowerPhysics.engine;
  let flower = entities.flower.body;
  
  touches.filter(t => t.type === 'press').forEach(t => {
    Matter.Body.applyForce(flower, flower.position, { x: 0.1, y: 0.0 });
    console.log('press')
  });

  Matter.Engine.update(engine, time.delta)
  return entities;
}

export default FlowerPhysics