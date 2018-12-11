import { createStackNavigator } from 'react-navigation'

import ParentMainMenuScreen from '../screens/parent/ParentMainMenuScreen'
import ActivityFormScreen from '../screens/parent/ActivityFormScreen'
import RoutineFormScreen from '../screens/parent/RoutineFormScreen'
import ChildFormScreen from '../screens/parent/ChildFormScreen'
import RemoveChildScreen from '../screens/parent/RemoveChildScreen'

export default createStackNavigator({
  ParentMainMenuScreen,
  ActivityFormScreen,
  RoutineFormScreen,
  ChildFormScreen,
  RemoveChildScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
