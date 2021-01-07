import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Images from '../assets/Images';

export default class BadCloud extends Component {
  render() {
  const width = this.props.size[0];
  const height = this.props.size[1]; 
  const x = this.props.body.position.x - width / 2;
  const y = this.props.body.position.y - height / 2;
  // const cloudNumber = this.props.cloudNumber
  // const cloudImage = '../assets/bad_cloud' + cloudNumber + '.png'

  let cloudImage = Images['badCloud' + this.props.cloudNumber];

    return (
      <View 
      style={{
        position: 'absolute',
        width: width,
        height: height,
        top: y,
        left: x,
        backgroundColor: this.props.color
      }}
      />
    ) 
  } 
}