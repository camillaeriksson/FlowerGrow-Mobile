import React, { Component } from 'react';
import Systems from './systems'

import { GameEngine } from 'react-native-game-engine';
import Matter, { Pairs } from 'matter-js';

import { View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

import Grass from './components/Grass';
import Pot from './components/Pot';
import Flower from './components/Flower';
import WaterMeter from './components/WaterMeter';
import Test from './components/Test';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

export default class GameArea extends Component {
  constructor(props) {
    super(props);
    this.GameEngine = null;
    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    engine.world.gravity.y = 0.02;

    let grass = Matter.Bodies.rectangle(0, max_height - 150, max_width, 150, { isStatic: true });
    let pot = Matter.Bodies.rectangle(max_width / 2 - 50, max_height - 140, 100, 80, { isStatic: true });
    let flower = Matter.Bodies.rectangle(max_width / 2 - 38 , max_height / 2, 76, 79, { isStatic: true });
    let waterMeter = Matter.Bodies.rectangle(20, max_height - 300, 30, 170, { isStatic: true });
    //let badCloud1 = Matter.Bodies.rectangle(this.randomizeXpos(0, max_width), -30, 117, 60, {isStatic: true });
    // let badCloud2 = Matter.Bodies.rectangle(this.randomizeXpos(0, max_width), -30, 117, 60, {isStatic: true });
    let test = Matter.Bodies.rectangle(100, max_height - 800, 50, 50, { isSensor: true });
    let test2 = Matter.Bodies.rectangle(200, max_height - 700, 50, 50, { isSensor: true });
    

    Matter.World.add(world, [grass, pot, flower, test, test2]);

   /*  test.collisionFilter = {
    'group': 6
    } */
    
    flower.collisionFilter = {
    'group': 5,
    'category': 20,
    'mask': 10
    }

    /* test2.collisionFilter = {
    'group': 6,
    } */
    
    pot.collisionFilter = {
      'group': 7
    }

    grass.collisionFilter = {
      'group': 7
    }


    Matter.Events.on(engine, "collisionStart", (event) => {
      let pairs = event.pairs;
      //if (pairs[0].bodyA.collisionFilter.category !== pairs[0].bodyB.collisionFilter.category) {
      console.log('träff')
    })


    return {
      physics: { engine: engine, world: world },
      grass: { body: grass, size: [max_width, 150], renderer: Grass},
      pot: { body: pot, size: [100, 80], renderer: Pot},
      // badCloud1: { body: badCloud1, size: [117, 60], renderer: BadCloud},
      // badCloud2: { body: badCloud2, size: [117, 60], renderer: BadCloud},
      flower: { body: flower, size: [76, 79], renderer: Flower},
      waterMeter: { body: waterMeter, color: 'blue', size: [30, 170], renderer: WaterMeter},
      test: { body: test, color: 'red', size: [50, 50], renderer: Test},
      test2: { body: test2, color: 'blue', size: [50, 50], renderer: Test}
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => { this.gameEngine = ref; }}
          style={styles.gameContainer}
          systems={Systems}
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

