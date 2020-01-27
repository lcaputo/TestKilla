import { React } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import BestMovies from '../screens/bestMovies'
import Movie from '../screens/movie'

const screens = {
    BestMovies: {
        screen: BestMovies,
        navigationOptions: {
          headerTitle: 'Top 10 Best Movies Weeakly'
        }
    },
    Movie: {
        screen: Movie
    }
}

const HomeStack = createStackNavigator(screens,
    {
        initialRouteName: 'BestMovies',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#546e7a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: "center",
            alignSelf: "center"
          },
        },
      }
    )

export default createAppContainer(HomeStack)