import React, { Component } from 'react';
import { Image } from 'react-native';
import Images from '../assets/Images';

export default class BadCloud extends Component {
  render() {
  const width = this.props.size[0];
  const height = this.props.size[1]; 
  const x = this.props.body.position.x - width / 2;
  const y = this.props.body.position.y - height / 2;

  // Let the image of the cloud depend on the number of the prop (that is randomized)
  let cloudImage = Images['badCloud' + this.props.cloudNumber];

    return (
      <Image 
      style={{
        position: 'absolute',
        width: width,
        height: height,
        top: y,
        left: x,
        zIndex: 100
      }}
      resizeMode='stretch'
      source={cloudImage}
      />
    ) 
  } 
}