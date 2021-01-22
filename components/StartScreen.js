import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { ImageBackground, Text, StyleSheet, Image } from 'react-native';
import Images from '../assets/Images';

const max_width = Dimensions.get('screen').width;
const max_height = Dimensions.get('screen').height;
export default class Grass extends Component {
  render() {
    return (
      <ImageBackground source={Images['background']} style={styles.fullScreen}>
        <Image source={Images['logo']} style={styles.logo} />
        <View style={styles.startScreenTextContainer}>
          <Text style={styles.startScreenText}>
            Help the flower grow as high as possible!
          </Text>
          <Text style={styles.instructionText}>
            Slide your finger across the screen to steer the flower.
            Avoid the dark clouds, go through rain clouds to water the flower and watch out for the bees!
            Kill them with a click.
          </Text>
          <Text style={styles.startGameText}>Touch the screen</Text>
          <Text style={styles.startGameText}>to start!</Text>
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
  startScreenTextContainer: {
    position: 'absolute',
    top: max_height / 4,
    width: max_width / 1.3,
    borderRadius: 10,
    paddingTop: 60,
    paddingBottom: 40,
    padding: 35,
    backgroundColor: '#A8E5FC'
  },
  instructionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  startScreenText: {
    color: 'steelblue',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  startGameText: {
    color: 'steelblue',
    fontSize: 18,
    textAlign: 'center',
  },
  logo: {
    position: 'absolute',
    top: max_height / 4 - 90,
    width: 300,
    height: 150,
    zIndex: 1
  }
})
