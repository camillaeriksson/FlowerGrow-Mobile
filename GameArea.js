import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height
const max_width = Dimensions.get('screen').width


export default class GameArea extends Component {

  render() {
    return (
      <View style={styles.container}>
       <Text>HELLO</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: max_height,
    width: max_width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

