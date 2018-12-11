import { createStackNavigator } from 'react-navigation'

import ParentMainMenuScreen from '../screens/parent/ParentMainMenuScreen'
import ActivityFormScreen from '../screens/parent/ActivityFormScreen'
import PasswordPromptScreen from '../screens/parent/PasswordPromptScreen'
import RoutineFormScreen from '../screens/parent/RoutineFormScreen'

export default createStackNavigator({
  ParentMainMenuScreen,
  PasswordPromptScreen,
  ActivityFormScreen,
  RoutineFormScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
