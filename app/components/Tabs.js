import React, { Component } from 'react';
import { Container, Header, Content, Left, Body, Right, Title, Tab, Tabs } from 'native-base';
import Tab1 from '../routes/homeStack';
import Tab2 from '../screens/searchMovie';
import { Ionicons } from '@expo/vector-icons'

export default class TabsComponent extends Component {

  render() {

    return (
      <Container>
  <Tabs tabBarUnderlineStyle={{backgroundColor:'white'}}>
        <Tab tabStyle={{backgroundColor:'white'}} activeTabStyle={{backgroundColor:'cyan'}} textStyle={{color:'black'}} activeTextStyle={{color:'black'}} heading="TOP 10">
          <Tab1 />
        </Tab>
        <Tab tabStyle={{backgroundColor:'white'}} activeTabStyle={{backgroundColor:'cyan'}} textStyle={{color:'black'}} activeTextStyle={{color:'black'}} heading="Buscar">
          <Tab2 />
        </Tab>
      </Tabs>
    </Container>
    );
  }
  
}