import React from 'react';
import {
  View, StyleSheet, ActivityIndicator,
  Image, ScrollView, Dimensions
} from 'react-native';
import { Text, Card, Thumbnail, CardItem, Tabs, Tab, Body } from 'native-base'
import SwipeableRating from 'react-native-swipeable-rating';
import MovieCast from './movieCast'


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

let headers = new Headers();

parametros = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'default'
};

export default class Movie extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      movieID: this.props.navigation.getParam('id'),
      movieData: [],
    }
  }

  componentDidMount() {
    return fetch(`http://thecapu.com:8000/movie/${this.state.movieID}`, parametros)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
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
    const { height: heightOfDeviceScreen } = Dimensions.get('window');

    return (

      <View style={styles.container}>


        {this.state.isLoading ?
          <ActivityIndicator size="large" color="#0000ff" />
          :

          <View>

            <Body>

              <ScrollView style={{ backgroundColor: 'transparent' }}>

                <View style={{ width: width }}>
                  <Card style={styles.card}>
                    <CardItem style={{ height: height / 3 }}>
                      {this.state.movieData.map(movie => {
                        return (
                          <Image style={{ top: -40, left: 0, right: 0, bottom: 0, position: 'absolute', zIndex: -1 }} blurRadius={0}
                            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_image}` }} />
                        )
                      })}
                    </CardItem>
                    <CardItem>
                      {this.state.movieData.map(movie => {
                        return (
                          <Thumbnail large square source={{ uri: `https://image.tmdb.org/t/p/w500${movie.cover_image}` }} />
                        )
                      })}
                      <Body style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                          {this.state.movieData.map(movie => {
                            return movie.title
                          })}
                        </Text>
                        <Text>
                          {this.state.movieData.map(movie => {
                            return movie.production_company
                          })}
                        </Text>

                        {this.state.movieData.map(movie => {
                          return (
                            <SwipeableRating style={{ justifyContent: 'flex-start' }}
                              rating={movie.vote_average / 2}
                              size={16}
                              gap={4}
                              //onPress={this.handleRating}
                              xOffset={30}
                              emptyColor={'grey'}
                              color={'gold'}
                            />
                          )
                        })}


                      </Body>
                    </CardItem>

                    <CardItem>
                      <Text style={{ top: -15, fontSize: 14 }}>
                        {this.state.movieData.map(movie => {
                          return movie.genres
                        })}
                      </Text>

                    </CardItem>


                    <CardItem style={{ top: -25 }}>


                      <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false}
                        showsVerticalScrollIndicator={false} >


                        <View>


                          <Tabs tabBarUnderlineStyle={{ backgroundColor: 'white' }}>


                            <Tab style={{ height: height / 3.5 }} tabStyle={{ backgroundColor: '#cfd8dc' }} activeTabStyle={{ backgroundColor: '#607d8b' }} textStyle={{ color: 'black' }} activeTextStyle={{ color: 'white' }} heading="Sinopsis">

                              <Text style={{ marginTop: 20, fontSize: 16, textAlign: 'justify' }}>
                                {this.state.movieData.map(movie => {
                                  return movie.overview
                                })}
                              </Text>

                            </Tab>


                            <Tab tabStyle={{ backgroundColor: '#cfd8dc' }} activeTabStyle={{ backgroundColor: '#607d8b' }} textStyle={{ color: 'black' }} activeTextStyle={{ color: 'white' }} heading="Cast">
                              <MovieCast movieID={this.state.movieID} />
                            </Tab>

                          </Tabs>


                        </View>

                      </ScrollView>







                    </CardItem>

                  </Card>
                </View>
              </ScrollView>

            </Body>

          </View>


        }

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
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
  card: {
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingVertical: 5,
    height: 'auto'
  },
});