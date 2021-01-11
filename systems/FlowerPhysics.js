import Matter, { Constraint, World } from 'matter-js';
import { Dimensions } from 'react-native';
//import Stem from '../components/Stem';

//var Engine = Matter.Engine

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;
const min_width = 0;

const FlowerPhysics = (entities, { touches }) => {
  let flower = entities.flower.body;
  //let stem = entities.stem.body;
  let engine = entities.physics.engine;
  let total_seconds = parseInt(Math.floor(engine.timing.timestamp / 1000));
  //var particles = [];
  //let pot = entities.pot.body;

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

  /* var prev = null;
  for (var y = 20; y < 380; y += 40) {

    particles.push(stem)
    particles.push(stem)

    var options = {
      bodyA: stem,
      bodyB: flower,
      length: 120,
    }
  
    var constraint = Constraint.create(options);
    World.add(engine.world, constraint);

  } */

  //line(pot.position.y, flower.position.y)

 /*  function Particle(x, y, r) {
    var options = {
      friction: 0,
      restitution: 0.95
    }
  }

  particles.push(stem) */

  //console.log(particles)
  

  /* for (var i = 0; i < particles.length; i++) {
    particles[i].show()
  } */

 // Matter.Bodies.fromVertices
 // Matter.Body.setVertices(stem.verticies[0], { x: flower.position.x, y: 1 })
  
  //Matter.Vector.dot(stem.position.y, flower.position.y) 

  //Matter.Vector.clone(stem.position.y)

  //Matter.Vertices.create([{ x: 0, y: 1 }, { x: 25, y: 50 }, { x: 0, y: 10 }], stem)

  //Matter.Vertices.translate(stem.vertices.length, { x: 0, y: 1 }, 20)
  //console.log('stjälk', stem)

  return entities;
}

export default FlowerPhysics;