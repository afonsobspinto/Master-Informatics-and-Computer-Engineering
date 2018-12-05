import { createStackNavigator } from 'react-navigation'

import ParentMainMenuScreen from '../screens/parent/ParentMainMenuScreen'
import ActivityFormScreen from '../screens/parent/ActivityFormScreen'

export default createStackNavigator({
  ParentMainMenuScreen,
  ActivityFormScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
