import React, { Component } from 'react';
import Systems from './systems'

import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

import Grass from './components/Grass';
import Pot from './components/Pot';
import Flower from './components/Flower';
import Test from './components/Test';
import WaterMeterBackground from './components/WaterMeterBackground';
import { resetWaterLevel } from './systems/WaterMeterPhysics';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

export default class GameArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      waterLevel: 160,
      running: false,
      showStartScreen: true,
      showGameOverScreen: false
    };

    this.GameEngine = null;
    this.entities = this.setupWorld();
  }

  
  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    engine.world.gravity.y = 0.05;

    let flower = Matter.Bodies.rectangle(max_width / 2, max_height / 2, 60, 60, {isStatic: true});
    let grass = Matter.Bodies.rectangle(max_width / 2, max_height - 50, max_width, 200, { isStatic: true });
    let pot = Matter.Bodies.rectangle(max_width / 2, max_height - 120, 100, 80, { isStatic: true });
    // let test = Matter.Bodies.rectangle(100, max_height - 800, 50, 50, { isSensor: true });
    //let test2 = Matter.Bodies.rectangle(200, max_height - 700, 50, 50, { isSensor: true });
    let waterMeterBackground = Matter.Bodies.rectangle(20, max_height - 300, 30, 160, { isStatic: true });
    

    Matter.World.add(world, [grass, flower, pot, waterMeterBackground]);

    // test.collisionFilter = {
    // 'group': -4,
    // 'category': 30,
    // 'mask': 30
    // }
    
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
      });
      if (this.state.waterLevel === 0) {
        this.gameEngine.dispatch({ type: "game_over"});
      }
    });


    return {
      physics: { engine: engine, world: world },
      flower: { body: flower, size: [60, 60], color: 'red', renderer: Flower },
      grass: { body: grass, size: [max_width, 200], color: 'green', renderer: Grass },
      pot: { body: pot, size: [100, 80], renderer: Pot},
      // badCloud1: { body: badCloud1, size: [117, 60], renderer: BadCloud},
      // badCloud2: { body: badCloud2, size: [117, 60], renderer: BadCloud},
      // test: { body: test, color: 'red', size: [50, 50], renderer: Test},
      //test2: { body: test2, color: 'blue', size: [50, 50], renderer: Test},
      waterMeterBackground: { body: waterMeterBackground, color: 'grey', size: [30, 160], renderer: WaterMeterBackground}
    }
  }

  onEvent = (e) => {
    if (e.type === "score_down"){
      this.setState({
        waterLevel: this.state.waterLevel - 20
      });
    } if (e.type === "score_up") {
      if (this.state.waterLevel < 160) {
        this.setState({
          waterLevel: this.state.waterLevel + 20
        });
      }
    } if (e.type === "game_over") {
      this.setState({
        running: false,
        showGameOverScreen: true,
        showStartScreen: false
      });
    }
  }

  resetGame = () => {
    resetWaterLevel();
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      waterLevel: 160,
      showStartScreen: true,
      showGameOverScreen: false,
      running: false
    });
  }

  startGame = () => {
    this.resetGame();
    this.setState({
      running: true
    });
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
        <Text style={styles.score}>{this.state.waterLevel}</Text>
        <Text style={styles.scoreMeter}>{this.state.time}m</Text>
        {this.state.showGameOverScreen && !this.state.running && <TouchableOpacity onPress={this.resetGame} style={styles.fullScreenButton}>
          <View style={styles.fullScreen}>
            <Text style={styles.gameOverText}>GAME OVER</Text>
          </View>
        </TouchableOpacity>}
        {this.state.showStartScreen && !this.state.running && <TouchableOpacity onPress={this.startGame} style={styles.fullScreenButton}>
          <View style={styles.fullScreen}>
            <Text style={styles.gameOverText}>START SCREEN</Text>
          </View>
        </TouchableOpacity>}
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
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center'
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
    textAlign: 'center'
  }
});

