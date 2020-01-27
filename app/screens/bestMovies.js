import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { 
  ActivityIndicator,
  FlatList
} from 'react-native';
import { Button, Card, CardItem, Thumbnail, Text, Right, Body } from 'native-base';
import SwipeableRating from 'react-native-swipeable-rating';

let headers = new Headers();

paraametros = { method: 'GET',
               headers: headers,
               mode: 'cors',
               cache: 'default' };

export default class topMovies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      moviesData: [],
      rating: 0
    }
  }

  handleRating = (rating) => {
    this.setState({rating});
  }

  componentDidMount() {
    return fetch('http://thecapu.com:8000/movies', parametros)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataMovie: responseJson,
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }


  _renderItem = ({ item }) => (
    <Card onPress={() => {
      this.props.navigation.navigate('Movie', {id:item.id})
    }}>
        <CardItem>
         
          <Thumbnail large square source={{uri:`https://image.tmdb.org/t/p/w500${item.cover_image}`}} />

          <Body>
            <Text style={{fontSize:14,justifyContent:'flex-start',fontWeight:'bold',paddingLeft:10}}> 
              {item.title}
            </Text>
            <Text style={{fontSize:12,justifyContent:'flex-start',paddingLeft:10}}>
              {item.production_company}
            </Text>
            <Text style={{fontSize:9,justifyContent:'flex-start',paddingLeft:10}}>{item.genres}</Text>
            <SwipeableRating style={{justifyContent:'flex-start',paddingLeft:10}}
                rating={item.vote_average/2}
                size={16}
                gap={4}
                onPress={this.handleRating}
                xOffset={30}
                emptyColor={'grey'}
                color={'gold'}
              />
          </Body>

          <Right style={{top:10}}>
          <Ionicons name="ios-information-circle-outline" size={40} color='cadetblue' onPress={() => {
              this.props.navigation.navigate('Movie', {id:item.id})
            }} />
          </Right>
        </CardItem>
      </Card>
  );
  

  render() {
    return (
      <View>
        {this.state.isLoading ?
          <ActivityIndicator size="large" color="#0000ff" />
          :
          <View>
            <Text>{this.state.moviesData.original_title}</Text>
            <FlatList
              data={this.state.dataMovie}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              style={{marginBottom:'3.5%'}}
            />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});