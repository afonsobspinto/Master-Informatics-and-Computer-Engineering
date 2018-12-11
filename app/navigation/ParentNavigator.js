import { createStackNavigator } from 'react-navigation'

import ParentMainMenuScreen from '../screens/parent/ParentMainMenuScreen'
import ActivityFormScreen from '../screens/parent/ActivityFormScreen'
import RoutineFormScreen from '../screens/parent/RoutineFormScreen'
import RewardFormScreen from '../screens/parent/RewardFormScreen'

export default createStackNavigator({
  ParentMainMenuScreen,
  ActivityFormScreen,
  RoutineFormScreen,
  RewardFormScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
