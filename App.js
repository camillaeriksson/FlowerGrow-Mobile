import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import GameArea from './GameArea';


export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/background.png')} style={styles.backgroundImage}>
        <GameArea />
        <StatusBar style='auto' />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage:  {
    flex: 1,
    resizeMode: 'contain',
  }
});
