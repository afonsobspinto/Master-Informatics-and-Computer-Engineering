import { createStackNavigator } from 'react-navigation'

import ParentMainMenuScreen from '../screens/parent/ParentMainMenuScreen'

export default createStackNavigator({
  ParentMainMenuScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
