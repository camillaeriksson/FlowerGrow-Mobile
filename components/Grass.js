import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Images from '../assets/Images';

export default class Grass extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    let grassImage = Images['new_grass'];

    return (
      <Image
        style={{
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            zIndex: 100
        }}
        resizeMode="stretch"
        source={grassImage} />
    )
  }
}
