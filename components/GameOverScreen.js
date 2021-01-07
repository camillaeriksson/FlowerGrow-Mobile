import React, { Component } from 'react';
import { ImageBackground, Text, StyleSheet, Image } from 'react-native';
import Images from '../assets/Images';
export default class Grass extends Component {
  render() {
    return (
      <ImageBackground source={Images['background']} style={styles.fullScreen}>
        <Image source={Images['flower_0']} style={styles.flower_0} />
        <Text style={styles.gameOverText}>GROW OVER!</Text>
        <Text style={styles.scoreText}>You grew 300 meter</Text>
      </ImageBackground>
    ) 
  } 
}

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameOverText: {
    color: 'white',
    fontSize: 42,
    textAlign: 'center'
  },
  scoreText: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center'
  },
  flower_0: {
    width: 105,
    height: 110
  }
})
