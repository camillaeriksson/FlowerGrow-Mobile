import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import Grass from './components/Grass';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

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

    Matter.World.add(world, [grass]);

    return {
      grass: { body: grass, size: [max_width, 150], renderer: Grass}
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => { this.gameEngine = ref; }}
          style={styles.gameContainer}
          entities={this.entities}
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

