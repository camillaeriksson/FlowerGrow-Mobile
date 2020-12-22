import React, { Component } from 'react'
import { View, Dimensions, Image, StyleSheet } from 'react-native'

const max_height = Dimensions.get('screen').height
const max_width = Dimensions.get('screen').width

export default class Grass extends Component {
  render() {
    return (
      <View>
        <Image style={styles.grass} source={require('../assets/grass.png')} />
      </View>
    ) 
  } 
}

const styles = StyleSheet.create({
  grass: {
    position: 'absolute',
    width: max_width,
    height: 150,
    top: max_height - 150,
    left: 0
  },
});