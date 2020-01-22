import React, { Component } from 'react';
import { Container, Header, Content, Left, Body, Right, Title, Tab, Tabs } from 'native-base';
import Tab1 from '../screens/movies/bestMovies';
import Tab2 from '../screens/movies/searchMovie';
import { Ionicons } from '@expo/vector-icons'

export default class TabsComponent extends Component {

  render() {

    return (
      <Container>
      <Header style={{backgroundColor:'#4232ba',height:70}} hasTabs>
          <Left>
            <Ionicons name="ios-menu" size={30} style={{ top: '12%', color: 'white' }} 
            onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Left/>
        <Body>
          <Title style={{color:'white',top:'12%'}}> Movie App </Title>
        </Body>
        <Right />
      </Header>
      <Tabs tabBarUnderlineStyle={{backgroundColor:'white'}}>
        <Tab tabStyle={{backgroundColor:'#4232ba'}} activeTabStyle={{backgroundColor:'#4a35e8'}} textStyle={{color:'white'}} activeTextStyle={{color:'white'}} heading="TOP 10">
          <Tab1 />
        </Tab>
        <Tab tabStyle={{backgroundColor:'#4232ba'}} activeTabStyle={{backgroundColor:'#4a35e8'}} textStyle={{color:'white'}} activeTextStyle={{color:'white'}} heading="Buscar">
          <Tab2 />
        </Tab>
      </Tabs>
    </Container>
    );
  }
  
}