const WaterMeterPhysics = (entities, onEvent) => {
  if (onEvent.events.length) {
    if (onEvent.events[0].type === 'score_down') {
      entities.waterMeter.waterLevel -= 32;
      entities.waterMeter.newWaterMeterY +=32;
    } 
    if (onEvent.events[0].type === 'score_up') {
      if (entities.waterMeter.waterLevel < 160) {
        entities.waterMeter.waterLevel += 32;
        entities.waterMeter.newWaterMeterY -= 32;
      }
    }
  }
  return entities;
}

export default WaterMeterPhysics;