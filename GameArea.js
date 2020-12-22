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
    let world = engine.world
    let grass = Matter.Bodies.
  }

  render() {
    return (
      <View style={styles.container}>
       <Grass />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: max_height,
    width: max_width,
  },
});

