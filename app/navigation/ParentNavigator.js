import { createStackNavigator } from 'react-navigation'

import ParentMainMenuScreen from '../screens/parent/ParentMainMenuScreen'
import ActivityFormScreen from '../screens/parent/ActivityFormScreen'
import RoutineFormScreen from '../screens/parent/RoutineFormScreen'
import ChildFormScreen from '../screens/parent/ChildFormScreen'

export default createStackNavigator({
  ParentMainMenuScreen,
  ActivityFormScreen,
  RoutineFormScreen,
  ChildFormScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
