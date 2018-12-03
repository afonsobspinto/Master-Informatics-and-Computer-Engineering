import { createStackNavigator } from 'react-navigation'

import ChooseActivityScreen from '../screens/ChooseActivityScreen'
import ChildMainMenuScreen from '../screens/ChildMainMenuScreen'
import ParentScreen from '../screens/ParentScreen'
import RegisterScreen from '../screens/RegisterScreen'

export default createStackNavigator({
  ParentScreen: ParentScreen,
  ChooseActivityScreen: ChooseActivityScreen,
  ChildMainMenu: ChildMainMenuScreen,
  RegisterScreen: RegisterScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
