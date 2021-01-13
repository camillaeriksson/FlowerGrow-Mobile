import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { ImageBackground, Text, StyleSheet, Image } from 'react-native';
import Images from '../assets/Images';

const max_width = Dimensions.get('screen').width;
export default class Grass extends Component {
  render() {
    return (
      <ImageBackground source={Images['background']} style={styles.fullScreen}>
        <Image source={Images['logo']} style={styles.logo} />
        <View style={styles.startScreenTextContainer}>
          <Text style={styles.startScreenText}>
            Help the flower grow as high as possible!
          </Text>
          <Text style={styles.startScreenText}>
            Slide your finger across the screen to steer the flower.
            Avoid the dark clouds, go through rain clouds to water the flower.
          </Text>
          <Text style={styles.startScreenText}>
            Touch the screen to start!
          </Text>
        </View>
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
  startScreenText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    width: max_width / 1.5,
    marginBottom: 10,
    marginTop: 20
  },
  logo: {
    width: 300,
    height: 150
  }
})
