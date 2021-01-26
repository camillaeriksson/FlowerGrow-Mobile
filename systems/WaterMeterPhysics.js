const WaterMeterPhysics = (entities, onEvent) => {
  // Checking if there is an event
  if (onEvent.events.length) {
    // Reduce the water level and move it downwards if the dispatched event is "score down"
    if (onEvent.events[0].type === 'score_down') {
      if (entities.waterMeter.waterLevel > 32) {
        entities.waterMeter.waterLevel -= 32;
        entities.waterMeter.newWaterMeterY += 16;
      }
    } 
    // Increase the water level and move it upwards if the dispatched event is "score up"
    if (onEvent.events[0].type === 'score_up') {
      // Only if the water level is not full (160 px high)
      if (entities.waterMeter.waterLevel < 160) {
        entities.waterMeter.waterLevel += 32;
        entities.waterMeter.newWaterMeterY -= 16;
      }
    }
  }
  return entities;
}

export default WaterMeterPhysics;