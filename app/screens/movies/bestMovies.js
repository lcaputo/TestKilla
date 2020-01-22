import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { 
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Title, ListItem, Subtitle } from 'native-base';


export default class topMovies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      moviesData: []
    }
  }

  componentDidMount() {
    return fetch('http://192.168.0.26:8000/movies')
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
    <Card>
        <CardItem>
         
          <Thumbnail large square source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} />

          <Body>
            <Text style={{justifyContent:'flex-start',fontWeight:'bold',paddingHorizontal:10}}> 
              {item.title}
            </Text>
          </Body>

          <Right style={{top:10}}>
            <Ionicons name="md-paper" size={42} color='cadetblue' />
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
              data={this.state.dataMovie.results}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
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