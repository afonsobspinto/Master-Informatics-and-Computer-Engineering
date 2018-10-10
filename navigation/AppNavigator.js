import { createSwitchNavigator } from 'react-navigation'

import ChooseRoutineScreen from '../screens/ChooseRoutineScreen'

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: ChooseRoutineScreen
})
