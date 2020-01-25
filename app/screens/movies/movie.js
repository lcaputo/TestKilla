import React from 'react';
import { Text, View, StyleSheet, Svg, height, width, ClipPath, Circle, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { Button, Left, Right } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation'

let headers = new Headers();

parametros = { method: 'GET',
               headers: headers,
               mode: 'cors',
               cache: 'default' };

export default class searchMovies extends React.Component {
  

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      movieID: this.props.navigation.getParam('id', 'Error')
    }
  }

  componentDidMount() {
    return fetch(`http://192.168.0.26:8000/movie/${this.state.movieID}`, parametros)
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

  render() {
    return (
      <View style={styles.container}>



        <Card title="Local Modules">

          <Text style={styles.paragraph}>
            This is a card from the react-native-elements
          </Text>
        </Card>
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