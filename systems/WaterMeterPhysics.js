import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import WaterMeter from '../components/WaterMeter';

const max_height = Dimensions.get('screen').height;
// let newWaterMeterY = max_height - 300;

// export const resetWaterLevel = () => {
//   waterLevel = 160;
  // newWaterMeterY = max_height - 300;
// }

// const updateWaterMeter = (world, entities, waterLevel) => {

//   let waterMeter = Matter.Bodies.rectangle(20, max_height - 300, 30, waterLevel, { isStatic: true });

//   Matter.World.add(world, [waterMeter]);

//   entities['waterMeter'] = {
//     body: waterMeter, 
//     color: '#1F63E0', 
//     size: [30, waterLevel], 
//     renderer: WaterMeter
//   }
// }

const WaterMeterPhysics = (entities, onEvent) => {
  let world = entities.physics.world;
  let engine = entities.physics.engine;
  let total_time = parseInt(Math.floor(engine.timing.timestamp));
  // let waterLevel = entities.waterMeter.waterLevel
  let flowerNumber = 0;
  let flower = entities.flower;

    // updateWaterMeter(world, entities, waterLevel)


  if (onEvent.events.length) {
    if (onEvent.events[0].type === 'score_down') {
      entities.waterMeter.waterLevel -= 32;
      entities.waterMeter.newWaterMeterY +=32;
      // delete(entities['waterMeter'])
      // updateWaterMeter(world, entities, waterLevel)
      if (entities.waterMeter.waterLevel === 0) {
        delete(entities['waterMeter'])
      }
    } 
    if (onEvent.events[0].type === 'score_up') {
      if (entities.waterMeter.waterLevel < 160) {
        entities.waterMeter.waterLevel += 32;
        entities.waterMeter.newWaterMeterY -= 32;
        // delete(entities["waterMeter"]);
        // updateWaterMeter(world, entities, waterLevel);
      }
    }
  }
  return entities;
}

export default WaterMeterPhysics;