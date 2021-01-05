import React, { Component } from 'react';
import { View } from 'react-native';

export default class WaterMeter extends Component {
  render() {
  const width = this.props.size[0];
  const height = this.props.size[1]; 
  const x = this.props.body.position.x;
  const y = this.props.body.position.y;
  const score = this.props.score;

    return (
      <View>
        <View style={{
          position: 'absolute',
          width: width,
          height: height,
          top: y,
          left: x,
          backgroundColor: this.props.color,
          opacity: 0.6,
          borderRadius: 15,
          borderWidth: 4,
          borderColor: 'darkblue'
          }}
        />
      <View style={{
          position: 'absolute',
          width: width,
          height: score,
          top: y + height - score,
          left: x,
          borderRadius: 15,
          backgroundColor: 'red',
          opacity: 0.6,
          }}
        />
      </View>
    ) 
  } 
}
