import React, { Component } from 'react';
import { Image } from 'react-native';

export default class BadCloud extends Component {
  render() {
  const width = this.props.size[0]
  const height = this.props.size[1] 
  const x = this.props.body.position.x
  const y = this.props.body.position.y

    return (
      <Image 
      style={{
        position: 'absolute',
        width: width,
        height: height,
        top: y,
        left: x
      }}
      source={require('../assets/bad_cloud1.png')} />
    ) 
  } 
}