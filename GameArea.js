import React, { Component } from 'react';
import Systems from './systems'

import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

import { View, StyleSheet, Text } from 'react-native';
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

    this.state = {
      time: 0
    };

    this.GameEngine = null;
    this.entities = this.setupWorld();

    this.state = {
      score: 100
    };

  }

  
  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    engine.world.gravity.y = 0.05;

    let grass = Matter.Bodies.rectangle(0, max_height - 150, max_width, 150, { isStatic: true });
    let pot = Matter.Bodies.rectangle(max_width / 2 - 50, max_height - 140, 100, 80, { isStatic: true });
    let flower = Matter.Bodies.rectangle(max_width / 2 - 38 , max_height / 2, 76, 79, { isStatic: true });
    let waterMeter = Matter.Bodies.rectangle(20, max_height - 300, 30, 170, { isStatic: true });
    //let badCloud1 = Matter.Bodies.rectangle(this.randomizeXpos(0, max_width), -30, 117, 60, {isStatic: true });
    // let badCloud2 = Matter.Bodies.rectangle(this.randomizeXpos(0, max_width), -30, 117, 60, {isStatic: true });
    let test = Matter.Bodies.rectangle(100, max_height - 800, 50, 50, { isSensor: true });
    //let test2 = Matter.Bodies.rectangle(200, max_height - 700, 50, 50, { isSensor: true });
    

    Matter.World.add(world, [grass, pot, flower, test]);

    test.collisionFilter = {
    'group': -4,
    'category': 30,
    'mask': 30
    }
    
    flower.collisionFilter = {
    'group': 5,
    'category': 20,
    'mask': 10
    }
    
    pot.collisionFilter = {
      'group': 7
    }

    grass.collisionFilter = {
      'group': 7
    }

    Matter.Events.on(engine, "collisionStart", (event) => {
      for (var i = 0; i < event.pairs.length; i++) {
        let pairs = event.pairs[i];
        if (pairs.bodyA.collisionFilter.group === 5 && pairs.bodyB.collisionFilter.group === -5) {
        this.gameEngine.dispatch({ type: "score_down"});
        } if (pairs.bodyA.collisionFilter.group === 5 && pairs.bodyB.collisionFilter.group === -4) {
        this.gameEngine.dispatch({ type: "score_up"});
        }
      }
    })

    Matter.Events.on(engine, 'beforeUpdate', (event) => {
      let total_seconds = parseInt(Math.floor(engine.timing.timestamp / 1000));
      this.setState({
        time: total_seconds
      })
    });

    return {
      physics: { engine: engine, world: world },
      grass: { body: grass, size: [max_width, 150], renderer: Grass},
      pot: { body: pot, size: [100, 80], renderer: Pot},
      // badCloud1: { body: badCloud1, size: [117, 60], renderer: BadCloud},
      // badCloud2: { body: badCloud2, size: [117, 60], renderer: BadCloud},
      flower: { body: flower, color: 'blue', size: [76, 79], renderer: Flower},
      waterMeter: { body: waterMeter, color: 'blue', size: [30, 170], renderer: WaterMeter},
      test: { body: test, color: 'red', size: [50, 50], renderer: Test},
      //test2: { body: test2, color: 'blue', size: [50, 50], renderer: Test}
    }
  }

  onEvent = (e) => {
    if (e.type === "score_down"){
      this.setState({
          score: this.state.score - 10
      });
    } if (e.type === "score_up") {
      this.setState({
        score: this.state.score + 10
      });
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
          onEvent={this.onEvent}
        />
        <Text style={styles.score}>{this.state.score}</Text>
        <Text style={styles.scoreMeter}>{this.state.time}m</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scoreMeter: {
    position: 'absolute',
    color: 'white',
    fontSize: 22,
    top: max_height - 130,
    left: 15,
    textShadowColor: '#444444',
    textShadowOffset: { width: 2, height: 2},
    textShadowRadius: 2,
  },
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
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 50,
    left: max_width / 2 - 20,
    textShadowColor: '#444444',
    textShadowOffset: { width: 2, height: 2},
    textShadowRadius: 2
  },
});

