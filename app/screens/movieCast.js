import React from 'react';
import {
  View, StyleSheet, ActivityIndicator,
  Svg, Circle, ClipPath, Image, ImageBackground,
  ScrollView, SafeAreaView, Dimensions, FlatList,
} from 'react-native';
import { Button, Left, Right, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation'
import { Text, Card, Thumbnail, CardItem, Tabs, Tab } from 'native-base'
import SwipeableRating from 'react-native-swipeable-rating';

const initialLayout = { width: Dimensions.get('window').height };
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

let headers = new Headers();

parametros = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'default'
};

export default class MovieCast extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      movieID: this.props.movieID,
      movieCast: [],
    }
  }

  componentDidMount() {
    return fetch(`http://thecapu.com:8000/movie/${this.state.movieID}/cast`, parametros)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          movieCast: responseJson,
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderCast = ({ item }) => (

      <Card>
        <CardItem>
          {item.picture == null ?
            <Thumbnail source={require('../../assets/DefaultPP.png')} />
          :
            <Thumbnail source={{ uri: `https://image.tmdb.org/t/p/w500${item.picture}` }} />
          }
          <Body style={{paddingLeft:'5%'}}>
            <Text style={{fontWeight:'bold'}}>{item.name}</Text>
            <Text>{item.character}</Text>
          </Body>
        </CardItem>
      </Card>

  )

  render() {
    return (
        
            <FlatList  
              data={this.state.movieCast}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderCast}
              style={{marginTop:'2%',height:height/5}}
            />
  
    );

  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  likeBtn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    padding: 10,
    borderRadius: 50,
    zIndex:9
  },
  card: {
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingVertical: 5
  },
  parallax: {
    
/*     background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
  }
});