import React from 'react';
import { 
  View, StyleSheet, ActivityIndicator,
  Svg, Circle, ClipPath, Image, width
} from 'react-native';
import { Button, Left, Right, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation'
import { Text, Card, Thumbnail, CardItem } from 'native-base'
import SwipeableRating from 'react-native-swipeable-rating';


let headers = new Headers();

parametros = { method: 'GET',
               headers: headers,
               mode: 'cors',
               cache: 'default' };

export default class Movie extends React.Component {
  

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      movieID: this.props.navigation.getParam('id'),
      movieData: []
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    return fetch(`http://192.168.0.105:8000/movie/${this.state.movieID}`, parametros)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          movieData: responseJson,
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>

        <View>
        {this.state.isLoading ?
          <ActivityIndicator size="large" color="#0000ff" />
          :
        <View>
<Body>
          {this.state.movieData.map(movie => {
             return(
           
                
                  <Image style = {{width:400, height:400, top:-80}} blurRadius={1}
                source={{uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_image}`}} />
                
                
             )
            })}

<View style={{top:'-30%',width:410}}>
<Card style={{width:width,flex:2}}>
              <CardItem>
              {this.state.movieData.map(movie => {
             return(
           
                
              <Thumbnail large square source={{uri:`https://image.tmdb.org/t/p/w500${movie.cover_image}`}} />

                
             )
            })}
            <Body style={{paddingLeft:10}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>dw</Text>
            <Text>
              {this.state.movieData.map(movie => {
                return movie.production_company
              })}
            </Text>

            <Text>
            {this.state.movieData.map(movie => {
                // FIXME: CRASH WaRNING
                return (
                  <SwipeableRating style={{justifyContent:'flex-start',paddingLeft:10}}
                rating={movie.vote_average/2}
                size={16}
                gap={4}
                //onPress={this.handleRating}
                xOffset={30}
                emptyColor={'grey'}
                color={'gold'}
              />
                )
              })}
            </Text>

            </Body>
              </CardItem>
              <CardItem>
              <Text style={{paddingHorizontal:10}}>
              <Text style={{fontWeight:'bold'}}>Gender: </Text>
              {this.state.movieData.map(movie => {
                return movie.genres
              })}
            </Text>




              </CardItem>

            </Card>
</View>

            </Body>

        </View>

      
        }
        </View>

        <Right/>
        <Button style={styles.likeBtn}>
          <Text>
            <Ionicons name="ios-heart-empty" size={40} color='white' />
          </Text>
        </Button>
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
  likeBtn: {
    width:60,
    height:60,
    justifyContent:"center",
    position:'absolute',
    bottom:'5%',
    right:'5%',
    padding:10,
    borderRadius:50
  }
});