import React, { Component } from 'react';
import Systems from './systems'

import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

import { View, StyleSheet, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import { Dimensions } from 'react-native';

import Grass from './components/Grass';
import Pot from './components/Pot';
import Flower from './components/Flower';
import WaterMeterBackground from './components/WaterMeterBackground';
import WaterMeter from './components/WaterMeter';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import Stem from './components/Stem';
import { Audio } from 'expo-av';

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
      showGameOverScreen: false,
      soundIsMuted: false
    };

    this.GameEngine = null;
    this.entities = this.setupWorld();
  }
  
  // Initialize the sound effects to the game
  async componentDidMount() {
    this.beeSound = new Audio.Sound();
    this.backgroundMusic = new Audio.Sound();
    this.sadFlowerCloudSound = new Audio.Sound();
    this.happyFlowerLaugh = new Audio.Sound();
    try {
      await this.backgroundMusic.loadAsync(
        require('./assets/sounds/backgroundMusic.mp3')
      );
      await this.sadFlowerCloudSound.loadAsync(
        require('./assets/sounds/sadFlowerCloudSound.wav')
      );
      await this.happyFlowerLaugh.loadAsync(
        require('./assets/sounds/happyFlowerLaugh.wav')
      );
      await this.backgroundMusic.setIsLoopingAsync(true);
      await this.backgroundMusic.setVolumeAsync(0.2);
      await this.backgroundMusic.playAsync();
    } catch (error) {}
  }

  //Function for playing sad flower sound
  soundOnScoreDown = () => {
    if (!this.state.soundIsMuted) {
      this.sadFlowerCloudSound.setVolumeAsync(0.5);
      this.sadFlowerCloudSound.replayAsync();
    }
  }

  //Function for playing happy flower sound
  soundOnScoreUp = () => {
    if (!this.state.soundIsMuted) {
      this.happyFlowerLaugh.setVolumeAsync(0.5);
      this.happyFlowerLaugh.replayAsync();
    }
  }

  muteAllSound = () => {
    this.setState({
      soundIsMuted: true
    });
    this.backgroundMusic.pauseAsync();
  }

  playAllSound = () => {
    this.setState({
      soundIsMuted: false
    });
    this.backgroundMusic.playAsync();
  }

  // Function for creating a matter engine, all the matter bodies and adding them to the world,
  // adding collision filters on the bodies, and returning them to entities
  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    engine.world.gravity.y = 0.00;

    let flower = Matter.Bodies.rectangle(max_width / 2, max_height - 140, 70, 70, {isStatic: true});
    let grass = Matter.Bodies.rectangle(max_width / 2, max_height - 100, max_width, 200, {isSensor: true});
    let pot = Matter.Bodies.rectangle(max_width / 2, max_height - 140, 100, 80, {isSensor: true});
    let waterMeterBackground = Matter.Bodies.rectangle(20, max_height - 300, 30, 160, { isStatic: true });
    let stem = Matter.Bodies.rectangle(max_width / 2, max_height + 500, 100, 800);
    let waterMeter = Matter.Bodies.rectangle(20, max_height - 300, 30, 160, { isStatic: true });

    Matter.World.add(world, [grass, flower, pot, waterMeterBackground, waterMeter, stem]);

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

    // Function for checking start of collisions
    Matter.Events.on(engine, 'collisionStart', (event) => {
      for (var i = 0; i < event.pairs.length; i++) {
        let pairs = event.pairs[i];
        // If flower collides with bad clouds or bees
        if (pairs.bodyA.collisionFilter.group === 5 && pairs.bodyB.collisionFilter.group === -5) {
        this.gameEngine.dispatch({ type: 'score_down'});
        this.soundOnScoreDown();
        // If flower collides with good clouds
        } if (pairs.bodyA.collisionFilter.group === 5 && pairs.bodyB.collisionFilter.group === -4) {
        this.gameEngine.dispatch({ type: 'score_up'});
        this.soundOnScoreUp();
        }
      }
    })

    // Function for every time the engine updates
    Matter.Events.on(engine, 'beforeUpdate', (event) => {
      // Set the run time (which is also the score) to the state
      let total_seconds = parseInt(Math.floor(engine.timing.timestamp / 1000));
      this.setState({
        time: total_seconds
      });
      // Checking if the water level is 0 and if so, the game is over
      if (this.state.waterLevel === 0) {
        this.gameEngine.dispatch({ type: 'game_over'});
      }
      // Let the gravity start after 1 sec
      if (this.state.time === 1) {
        engine.world.gravity.y = 0.05;
      }
      engine.world.gravity.y *= 1.0002;
    });


    return {
      physics: { engine: engine, world: world },
      flower: { body: flower, size: [70, 70], flowerNumber: 'bud', renderer: Flower },
      grass: { body: grass, size: [max_width, 200], color: 'green', renderer: Grass },
      pot: { body: pot, size: [100, 80], renderer: Pot},
      stem: { body: stem, size: [100, 800], renderer: Stem },
      waterMeterBackground: { body: waterMeterBackground, color: 'grey', size: [30, 160], renderer: WaterMeterBackground},
      waterMeter: { body: waterMeter, color: '#1F63E0', size: [30, 160], waterLevel: 160, newWaterMeterY: max_height - 300, renderer: WaterMeter}
    }
  }

  // Function for checking all the dispatched values
  onEvent = (e) => {
    // Reduce the water level if 'score down' is dispatched
    if (e.type === 'score_down'){
      this.setState({
        waterLevel: this.state.waterLevel - 32
      });
    } 
    // Increase the water level if 'score up' is dispatched
    if (e.type === 'score_up') {
      // Only if the water level is not full (160 px high)
      if (this.state.waterLevel < 160) {
        this.setState({
        waterLevel: this.state.waterLevel + 32
      });
      }
    } 
    // Stop game loop and show game over screen if 'game over' is dispatched
    if (e.type === 'game_over') {
      this.setState({
        running: false,
        showGameOverScreen: true,
        showStartScreen: false
      });
    }
  }

  // Function for resetting the game loop
  resetGame = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      waterLevel: 160,
      showStartScreen: true,
      showGameOverScreen: false,
    });
  }

  // Function for start the game loop
  startGame = () => {
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
          running={this.state.running}
        />
        {!this.state.soundIsMuted && <TouchableOpacity style={styles.soundButton} onPress={this.muteAllSound}>
          <Image source={require('./assets/volume.png')}/>
        </TouchableOpacity>}
        {this.state.soundIsMuted && <TouchableOpacity style={styles.soundButton} onPress={this.playAllSound}>
          <Image source={require('./assets/mute.png')}/>
        </TouchableOpacity>}
        <Text style={styles.scoreMeter}>{this.state.time}m</Text>
        {this.state.showGameOverScreen && !this.state.running && <Pressable onPress={this.resetGame} style={styles.fullScreenButton}>
          <GameOverScreen score={this.state.time}/>
        </Pressable>}
        {this.state.showStartScreen && !this.state.running && <Pressable onPress={this.startGame} style={styles.fullScreenButton}>
          <StartScreen />
        </Pressable>}
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
  soundButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  }
});

