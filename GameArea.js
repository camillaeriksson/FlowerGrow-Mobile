import React, { Component } from 'react';

import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

import { View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

import Grass from './components/Grass';
import Pot from './components/Pot';
import BadCloud from './components/BadCloud';
import Flower from './components/Flower';
import FlowerPhysics from './components/FlowerPhysics';

const max_height = Dimensions.get('screen').height
const max_width = Dimensions.get('screen').width

export default class GameArea extends Component {
  constructor(props) {
    super(props) 
    this.GameEngine = null;
    this.entities = this.setupWorld();
  } 

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let grass = Matter.Bodies.rectangle(0, max_height - 150, max_width, 150, { isStatic: true });
    let pot = Matter.Bodies.rectangle(max_width / 2 - 50, max_height - 140, 100, 80, { isStatic: true });
    let badCloud = Matter.Bodies.rectangle(max_width / 5, max_height / 4, 50, 50, { isStatic: true });
    let flower = Matter.Bodies.rectangle(max_width / 2 - 37.5 , max_height / 2, 75, 75);

    Matter.World.add(world, [grass, pot, badCloud, flower]);

    return {
      flowerPhysics: { engine: engine, world: world },
      grass: { body: grass, size: [max_width, 150], renderer: Grass},
      pot: { body: pot, size: [100, 80], renderer: Pot},
      badCloud: { body: badCloud, size: [117, 60], renderer: BadCloud},
      flower: { body: flower, size: [76, 78], renderer: Flower}
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => { this.gameEngine = ref; }}
          style={styles.gameContainer}
          entities={this.entities}
          systems={[FlowerPhysics]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: max_height,
    width: max_width,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
});

