import React, { Component } from 'react';
import { Image } from 'react-native';
import Images from '../assets/Images';

export default class GoodCloud extends Component {
  render() {
  const width = this.props.size[0];
  const height = this.props.size[1]; 
  const x = this.props.body.position.x - width / 2;
  const y = this.props.body.position.y - height / 2;

    return (
      <Image 
      style={{
        position: 'absolute',
        width: width,
        height: height,
        top: y,
        left: x
      }}
      resizeMode='stretch'
      source={Images['goodCloud']}
      />
    ) 
  } 
}