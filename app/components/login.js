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

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
class Login extends Component {
  constructor() {
    super();

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
            )
          ])
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0,1))
            )
          ])
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 200, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.TextInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height/7, 100],
      extrapolate: Extrapolate.CLAMP
    });
    

    this.TextInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });

  }
  componentWillMount () {
    //this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.bgY_second);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        console.log('dissmis keyboard')
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "flex-end"
        }}
      >

          <View>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateY: this.bgY }]
            }}
          >
            <Svg height={height + 50} width={width}>
              <ClipPath id="clip">
                <Circle r={height + 50} cx={width / 2} />
              </ClipPath>
              <Image
                href={require("../../assets/bg.jpg")}
                width={width}
                height={height + 50}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip)"
              />
            </Svg>
          </Animated.View>
          </View>


        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <View style={{ height: height, justifyContent: "center" }}>
            
            <View  style={{ top: 260}}>
              
              <View style={styles.container}>


              <Animated.View
              style={{
                ...styles.button,
                width: '40%',
                backgroundColor: "#2E71DC",
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "white"}}
              >
                <Text style={{margin:'auto'}}>SIGN IN WITH </Text> <Ionicons name="logo-facebook" size={25} />
              </Text>
            </Animated.View>



            <Animated.View
              style={{
                ...styles.button,
                width: '40%',
                backgroundColor: "#bf3220",
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
              >
                <Text style={{margin:'auto'}}>SIGN IN WITH </Text> <Ionicons name="logo-google" size={25} />
              </Text>
            </Animated.View>


              </View>

            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View
                style={{
                  ...styles.button,
                  top: 50,
                  opacity: this.buttonOpacity,
                  transform: [{ translateY: this.buttonY }]
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  SIGN IN WITH E-MAIL
                </Text>
              </Animated.View>
            </TapGestureHandler>
          </View> 

            <Animated.View
              style={{
                zIndex: this.TextInputZindex,
                opacity: this.TextInputOpacity,
                transform: [{ translateY: this.textInputY }],
                height: height / 6,
                ...StyleSheet.absoluteFill,
                top: null,
                justifyContent: "center"
              }}
            >
              <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                <Animated.View style={styles.closeButton}>
                  <Animated.Text
                    style={{
                      fontSize: 20,
                      transform: [{ rotate: concat(this.rotateCross, "deg") }]
                    }}
                  >
                    {" "}
                    X{" "}
                  </Animated.Text>
                </Animated.View>
              </TapGestureHandler>

              <TextInput
                placeholder="Email"
                style={styles.TextInput}
                placeholderTextColor="black"
              />
              <TextInput
                placeholder="Password"
                style={styles.TextInput}
                placeholderTextColor="black"
              />
              <Text
                style={{
                  fontSize: 15,
                  padding: 2,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                {" "}
                FORGOT YOUR PASSWORD ?
                <Text
                  style={{ color: "blue" }}
                  onPress={() => Linking.openURL("http://google.com")}
                >
                  {" "}
                  RECOVER
                </Text>
              </Text>
              <Animated.View style={styles.button}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {" "}
                  SIGN IN{" "}
                </Text>
              </Animated.View>
              <Animated.View>
                <Text
                  style={{
                    fontSize: 15,
                    top: 10,
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {" "}
                  REGISTRY
                  <Text
                    style={{ color: "blue" }}
                    onPress={() => Linking.openURL("http://google.com")}
                  >
                    {" "}
                    HERE
                  </Text>
                </Text>
              </Animated.View>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    top: -65,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 2, height: 2},
    borderWidth:0,
  },
  closeButton: {
    height:40,width:40,
    backgroundColor: 'white',
    borderRadius:20,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -height/5,
    left: width / 2 - 20
  },
/*   input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  }, */
  TextInput: {
    padding: 10,
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)'
  }
});