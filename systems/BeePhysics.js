import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import Bee from '../components/Bee';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

let bees = 0;

const randomizeNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const spawnBees = (world, entities) => {

  let bee = Matter.Bodies.rectangle(0, randomizeNumber(0, max_height), 40, 40, {isStatic: true});

  Matter.World.add(world, [bee]);

  entities["bee" + (bees + 1)] = {
    body: bee,
    size: [40, 40],
    beeDirection: 'right',
    renderer: Bee
  }

  bees += 1;

  // badCloud.collisionFilter = {
  //   'group': -5,
  //   'category': 10,
  //   'mask': 20
  // }

}

const BeePhysics = (entities) => {
  let world = entities.physics.world;
  let engine = entities.physics.engine;
  let total_time = parseInt(Math.floor(engine.timing.timestamp));
  let flower = entities.flower.body;

  if (total_time > 2100 && total_time < 2135){
    spawnBees(world, entities);
  }

  Object.keys(entities).forEach(key => {
    if (key.indexOf("bee") === 0) {
      // If bee and flower have same x position
      if (entities[key].body.position.x === flower.position.x) {
        // If bee is under flower
        if (entities[key].body.position.y <= flower.position.y) {
          Matter.Body.translate(entities[key].body, {
            x: 0,
            y: +1
          })
        } else {
          // If bee is over flower
          Matter.Body.translate(entities[key].body, {
            x: 0,
            y: -1
          });
        }
        // If bee and flower dosent have same x position
      } else {
        // If bee is under flower
        if (entities[key].body.position.y <= flower.position.y) {
          // If bee is to the left of flower
          if (entities[key].body.position.x <= flower.position.x) {
            entities[key].beeDirection = 'left'
          Matter.Body.translate(entities[key].body, {
            x: +1,
            y: +1
          })
          // If bee is to the right of flower
          } else {
            entities[key].beeDirection = 'right'
            Matter.Body.translate(entities[key].body, {
              x: -1,
              y: +1
            });
          }
          // If bee is over flower
        } else {
          // If bee is to the left of flower
          if (entities[key].body.position.x <= flower.position.x) {
            entities[key].beeDirection = 'left'
            Matter.Body.translate(entities[key].body, {
              x: +1,
              y: -1
            })
            // If bee is to the right of flower
            } else {
              entities[key].beeDirection = 'right'
              Matter.Body.translate(entities[key].body, {
                x: -1,
                y: -1
              });
            }
          

        }

      }
    }
  });

  return entities;
  
}

export default BeePhysics;