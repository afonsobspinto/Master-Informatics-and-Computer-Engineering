import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'

export default createStackNavigator({
  HomeScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
