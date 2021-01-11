import Matter, { Bodies, Constraint, World } from 'matter-js';
import { Dimensions } from 'react-native';
import Stem from '../components/Stem';

var Engine = Matter.Engine;

let particles = [];

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

//let stemPoints = 0;

/* const createStemPoints = (world, entities) => {

  let stemPoint = Matter.Bodies.rectangle(max_width / 2, max_height / 2 + 35, 5, 20);

  Matter.World.add(world, [stemPoint]);
  
  
  entities['stemPoint'] = {
    stemPoint: {
      body: stemPoint,
      color: 'green',
      size: [5, 20],
      renderer: Stem
    }
  }
  
  //particles.push(stemPoint)

  //console.log(particles)

  //stemPoints += 1;

} */

const StemPhysics = (entities) => {
  let flower = entities.flower.body;
  let stem = entities.stem.body;
  let pot = entities.pot.body;
  let engine = entities.physics.engine;
  var prev = null;

  
  //console.log(particles)
  
  for (var y = 20; y < 380; y += 40) {

    var options = {
      bodyA: stem,
      bodyB: flower,
      length: 120,
    }
  
    var constraint = Constraint.create(options);
    World.add(engine.world, constraint);

  }

  return entities;

}



export default StemPhysics;
