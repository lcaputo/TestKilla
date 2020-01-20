import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FirstOptionsPage from './FirstOptionsPage'


const MainNavigator = createStackNavigator({
FirstOptions: FirstOptionsPage,
},
{
defaultNavigationOptions: {
headerStyle: {
// backgroundColor: '#28F1A6',
elevation: 0,
shadowOpacity: 0
},
headerTintColor: '#ca375e',
headerTitleStyle: {
fontWeight: 'bold',
color: '#161616'
}
}
}
);

const App = createAppContainer(
    MainNavigator
    ); // For setting Navigation Stack

export default App;