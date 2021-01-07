import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { ImageBackground, Text, StyleSheet, Image } from 'react-native';
import Images from '../assets/Images';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

export default class Grass extends Component {
  render() {
    return (
      <ImageBackground source={Images['background']} style={styles.fullScreen}>
        <Image source={Images['logo']} style={styles.logo} />
        <Text style={styles.startScreenText}>
          Help the flower grow as high as possible!
          Slide your finger across the screen to steer the flower.
          Avoid the dark clouds, go through rain clouds to water the flower.
          Click on the screen to start!
        </Text>
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
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startScreenText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    width: max_width / 2
  },
  logo: {
    width: 300,
    height: 150
  }
})
