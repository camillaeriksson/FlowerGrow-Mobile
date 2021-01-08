import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import WaterMeter from '../components/WaterMeter';

const max_height = Dimensions.get('screen').height;

let waterLevel = 160;
let newWaterMeterY = max_height - 300;

export const resetWaterLevel = () => {
  waterLevel = 160;
  newWaterMeterY = max_height - 300;
}

const updateWaterMeter = (world, entities) => {

  
  let waterMeter = Matter.Bodies.rectangle(20, newWaterMeterY, 30, waterLevel, { isStatic: true });

  Matter.World.add(world, [waterMeter]);

  entities['waterMeter'] = {
    body: waterMeter, 
    color: '#1F63E0', 
    size: [30, waterLevel], 
    renderer: WaterMeter
  }
}

const WaterMeterPhysics = (entities, onEvent) => {
  let world = entities.physics.world;
  let engine = entities.physics.engine;
  let total_time = parseInt(Math.floor(engine.timing.timestamp));
  if (total_time < 2000) {
    updateWaterMeter(world, entities)
  }
  if (onEvent.events.length) {
    if (onEvent.events[0].type === 'score_down') {
      waterLevel -= 32;
      newWaterMeterY += 32;
      delete(entities['waterMeter'])
      updateWaterMeter(world, entities)
      if (waterLevel === 0) {
        delete(entities['waterMeter'])
      }
    } 
    if (onEvent.events[0].type === 'score_up') {
      if (waterLevel < 160) {
        waterLevel += 32;
        newWaterMeterY -= 32;
        delete(entities["waterMeter"]);
        updateWaterMeter(world, entities);
      }
    }
  }
  return entities;
}

export default WaterMeterPhysics;