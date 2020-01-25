import { React } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import BestMovies from '../screens/bestMovies'
import Movie from '../screens/movie'

const screens = {
    BestMovies: {
        screen: BestMovies
    },
    Movie: {
        screen: Movie
    }
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)