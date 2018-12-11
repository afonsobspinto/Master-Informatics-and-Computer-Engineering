import { createStackNavigator } from 'react-navigation'

import ParentMainMenuScreen from '../screens/parent/ParentMainMenuScreen'
import ActivityFormScreen from '../screens/parent/ActivityFormScreen'
import PasswordPromptScreen from '../screens/parent/PasswordPromptScreen'
import RoutineFormScreen from '../screens/parent/RoutineFormScreen'
import RewardFormScreen from '../screens/parent/RewardFormScreen'
import ChildFormScreen from '../screens/parent/ChildFormScreen'
import RemoveChildScreen from '../screens/parent/RemoveChildScreen'

export default createStackNavigator({
  ParentMainMenuScreen,
  PasswordPromptScreen,
  ActivityFormScreen,
  RewardFormScreen,
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
