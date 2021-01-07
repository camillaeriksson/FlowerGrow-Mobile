import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Images from '../assets/Images';

export default class Flower extends Component {
  render() {
  const diameter = this.props.size[0];
  //const height = this.props.size[1];
  const x = this.props.body.position.x;
  const y = this.props.body.position.y;

    return (
      <View 
      style={{
        position: 'absolute',
        width: diameter,
        height: diameter,
        top: y,
        left: x,
        backgroundColor: this.props.color
      }} />
    ) 
  } 
}