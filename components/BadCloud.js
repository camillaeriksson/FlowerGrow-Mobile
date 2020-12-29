import React, { Component } from 'react';
import { Image } from 'react-native';
import Images from '../assets/Images';

export default class BadCloud extends Component {
  render() {
  const width = this.props.size[0];
  const height = this.props.size[1]; 
  const x = this.props.body.position.x;
  const y = this.props.body.position.y;
  // const cloudNumber = this.props.cloudNumber
  // const cloudImage = '../assets/bad_cloud' + cloudNumber + '.png'

  let cloudImage = Images['badCloud' + this.props.cloudNumber];


    return (
      <Image 
      style={{
        position: 'absolute',
        width: width,
        height: height,
        top: y,
        left: x
      }}
      resizeMode="stretch"
      source={cloudImage} />
    ) 
  } 
}