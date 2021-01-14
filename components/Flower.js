import React, { Component } from 'react';
import Images from '../assets/Images';
import { Image } from 'react-native';

export default class Flower extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    // Let the image of the flower depend on the number of the prop (that is depending on hits and water level)
    let flowerImage = Images['flower_' + this.props.flowerNumber];

    return (
      <Image 
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
          zIndex: 100
        }} 
        resizeMode="stretch"
        source={flowerImage}
        />
    )
  }
}