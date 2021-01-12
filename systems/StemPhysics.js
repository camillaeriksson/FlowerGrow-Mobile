import Matter, { Bodies, Constraint, Composites, Composite } from 'matter-js';
import { Dimensions } from 'react-native';
import Stem from '../components/Stem';

var Engine = Matter.Engine;

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

//let stemPoints = 0;

const createStemPoints = (world, entities) => {

  let stemPoint = Matter.Bodies.rectangle(max_width / 2, max_height / 2 + 250, 3, 350);

  Matter.World.add(world, [stemPoint]);
  
  
  entities['stemPoint'] = {
    body: stemPoint,
    color: 'green',
    size: [3, 350],
    renderer: Stem
  }

  //stemPoints +=1;
}

const StemPhysics = (entities) => {
  let world = entities.physics.world;
  let flower = entities.flower.body;
  //let stem = entities.stemPoint.body;
  let engine = entities.physics.engine;
  var prev = null;

  createStemPoints(world, entities)

  /* let boxes = Composites.stack(500, 80, 3, 1, 10, 0, function() {
      return Bodies.rectangle(max_width / 2, max_height / 2, 50, 40, { render: { strokeStyle: 'black', fillStyle: 'black'}});
  });

  Matter.World.add(world, [boxes]);

  entities['boxes'] = {
    boxes: {
      body: boxes,
      color: 'black',
      size: [50, 40],
      renderer: Stem
    }
  }

  var chain = Composites.chain(boxes, 0.5, 0, -0.5, 0, { stiffness: 1});

  Composite.add(boxes, Constraint.create({ 
      bodyA: boxes.bodies[0],
      pointB: { x: 500, y: 15 },
      stiffness: 0.8
  }));
   */

/*   var options = {
    bodyA: stem,
    bodyB: flower,
    length: 0.5,
  }

  var constraint = Constraint.create(options);
  World.add(engine.world, constraint);
 */

  Object.keys(entities).forEach(key => {
    if (key.indexOf('stemPoint') === 0) {
      Matter.Body.setPosition(entities[key].body, {
        x: flower.position.x, 
        y: max_height / 2 + 250
      });
    }
  });

  return entities;

}



export default StemPhysics;
