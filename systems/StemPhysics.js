import Matter, { Constraint, World } from 'matter-js';
import { Dimensions } from 'react-native';
import Stem from '../components/Stem';

//var Engine = Matter.Engine;

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

/* const createStemPoints = (world, entities) => {

  let stemPoint = Matter.Bodies.rectangle(max_width / 2, max_height / 2 + 250, 3, 350);

  Matter.World.add(world, [stemPoint]);
  
  
  entities['stemPoint'] = {
    body: stemPoint,
    color: 'green',
    size: [3, 350],
    renderer: Stem
  } 

} */

const StemPhysics = (entities) => {
  let engine = entities.physics.engine;
  let flower = entities.flower.body;
  let stem = entities.stem.body;
  let stemHeight = max_height - flower.position.y

  stem.stemHeight = stemHeight

  Matter.Body.setPosition(stem, {x: flower.position.x, y: flower.position.y + 230 });

  //console.log('flower', max_height - flower.position.y, 'stemheight', stemHeight)

  //createStemPoints(world, entities)

  /* var options = {
    bodyA: stem,
    bodyB: flower,
    pointA: {x: 0, y: 0},
    pointB: {x: 0, y: 170},
    stiffness: 1,
    length: 0,
  }

  var constraint = Constraint.create(options);
  World.add(engine.world, constraint); */
  

  /* Object.keys(entities).forEach(key => {
    if (key.indexOf('stemPoint') === 0) {
      Matter.Body.setPosition(entities[key].body, {
        x: flower.position.x, 
        y: max_height / 2 + 250
      });
    }
  }); */

  return entities;

}

export default StemPhysics;
