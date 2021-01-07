import React, { Component } from 'react';
import { View } from 'react-native';

export default class WaterMeterBackground extends Component {
  render() {
  const width = this.props.size[0];
  const height = this.props.size[1]; 
  const x = this.props.body.position.x;
  const y = this.props.body.position.y;

    return (
        <View style={{
          position: 'absolute',
          width: width,
          height: height,
          top: y,
          left: x,
          backgroundColor: this.props.color,
          borderRadius: 15,
          borderWidth: 4,
          borderColor: 'cornflowerblue'
          }}
        />
    ) 
  } 
}