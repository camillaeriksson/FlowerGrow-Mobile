import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import BadCloud from '../components/BadCloud';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

let badClouds = 0;

randomizePos = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const addBadCloudsAtLocation = (world, entities) => {

  let badCloud = Matter.Bodies.rectangle(this.randomizePos(0, max_width), this.randomizePos(0, -500), 117, 60, {isStatic: true });

  Matter.World.add(world, [badCloud])

  entities["badCloud" + (badClouds + 1)] = {
    body: badCloud,
    size: [117, 60],
    renderer: BadCloud
  }

  badClouds += 1;

}

const BadCloudPhysics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let world = entities.physics.world;
  // let badCloud = entities.badCloud.body;

  let hadTouches = false;
    touches.filter(t => t.type === "press").forEach(t => {
        if (!hadTouches){
                addBadCloudsAtLocation(world, entities)
                addBadCloudsAtLocation(world, entities)
                addBadCloudsAtLocation(world, entities) 
            hadTouches = true;
        }

    });

  Matter.Engine.update(engine, time.delta); 

  Object.keys(entities).forEach(key => {
    if (key.indexOf("badCloud") === 0) {
      Matter.Body.translate(entities[key].body, {x: 0, y: 1})
    }
  })

  // for (let i = 1; i <= 2; i++) {
  //   if (entities['badCloud' + i].body.position.y > max_height) {
  //     Matter.Body.setPosition(entities['badCloud' + i].body, { x: entities['badCloud' + i].body.position.x, y: 0 });
  //   } else {
  //     Matter.Body.translate(entities['badCloud' + i].body, { x: 0, y: 1 });
  //   }
  // }



  return entities;
}

export default BadCloudPhysics;