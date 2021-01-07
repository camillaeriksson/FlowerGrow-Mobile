import React, { Component } from 'react';
import { View } from 'react-native';

export default class WaterMeter extends Component {
  render() {
  const width = this.props.size[0];
  const height = this.props.size[1]; 
  const x = this.props.body.position.x - width / 2;
  const y = this.props.body.position.y - height / 2;

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
