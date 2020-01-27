import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Asset} from 'expo-asset'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import DrawerNav from './app/components/leftDrawerNav';


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async _loadAssetsAsync() {
    await Expo.Font.loadAsync({
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    const imageAssets = cacheImages([require('./assets/bg.jpg')]);
    await Promise.all([...imageAssets]);
    this.state.setState({ isReady: true })
  }
    
    render() {
      if (!this.state.isReady) {
        return (
          <AppLoading
            startAsync={this._loadAssetsAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}
          />
        );
      }

      return <DrawerNav />

    }


  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
