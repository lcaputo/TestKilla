import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, TextInput, Button } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';

import Svg, {Image,Circle,Clip, ClipPath} from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons'
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

class Layout extends Component {

    state = {
        navItems : [
            'navegar',
            'categorias',
            'lista de deseos',
            'mi cuenta'
        ]
    }

    constructor() {
        super()

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>

                {
                    this.state.navItems.map((item, index) => {
                        return (
                            <Text key={index} style={styles.text}>
                                {item}
                            </Text>
                        )
                    })
                }

                </View>
            </View>
        )
    }

}

export default Layout



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        backgroundColor: 'blue',
        height: '20%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height:'12%',
    },
    text: {
        padding:'3.5%',
        fontWeight: 'bold',
        fontSize:15,
        top:20,
    }
  });
  