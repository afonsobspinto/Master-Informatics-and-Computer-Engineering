import { createSwitchNavigator } from 'react-navigation'

import SingleActivityScreen from '../screens/SingleActivityScreen'
import SingleActivityClockScreen from '../screens/SingleActivityClockScreen'

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: SingleActivityClockScreen
})
