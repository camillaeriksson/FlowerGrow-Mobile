import React, { Component } from 'react';
import Images from '../assets/Images';
import { Image } from 'react-native';

export default class Flower extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image 
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height
        }} 
        resizeMode="stretch"
        source={Images['flower_100']}
        />
    )
  }
}