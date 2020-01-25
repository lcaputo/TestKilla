import { React } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import bestMovies from '../screens/movies/bestMovies'
import movie from '../screens/movies/movie'

const screens = {
    bestMovies: {
        screen: bestMovies
    },
    movie: {
        screen: movie
    }
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)