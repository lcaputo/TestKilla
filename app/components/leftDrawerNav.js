import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
  } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { concat } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons'
import Tabs from './Tabs';

const DrawerContent = (props) => (
    <View>
      <View
        style={{
          backgroundColor: '#4232ba',
          height: 180,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        
        <Text style={{ color: 'white', fontSize: 30, backgroundColor: '#4232ba', }}>
            <Ionicons name="ios-film" size={32} color='white' /> The Movie App
        </Text>
        <Text style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: '100%',
            backgroundColor: 'black',
            marginTop: '5%',
            height: '1%'
            }}>
        </Text>
        <Text>
        <Image source={require('../../assets/DefaultPP.png')}  
            style={{width: 80, height: 80, borderRadius: 400/ 2}} 
        />
        </Text>
      </View>
      <DrawerItems {...props} />
    </View>
  )
  

const MyDrawerNavigator = createDrawerNavigator (
    {
        Tabs: Tabs
    },
    {
    contentComponent: DrawerContent,
    }
)

export default createAppContainer(MyDrawerNavigator);