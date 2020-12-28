import Matter from 'matter-js';

const Physics = (entities, {time}) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default Physics;