import React from 'react'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import PropTypes from 'prop-types'
import ActivityScreen from './screens/ActivityScreen'
import { _setDefault } from './helpers/Settings'
import ChooseRoutineScreen from './screens/ChooseRoutineScreen'
import ChooseActivityScreen from './screens/ChooseActivityScreen'
import { AppLoading, Font } from 'expo'
import ChildMainMenuScreen from './screens/ChildMainMenuScreen'
import ParentScreen from './screens/ParentScreen'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render () {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <AppStackNavigator />
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'LinotteBold': require('./assets/fonts/Linotte-Bold.ttf')
      }),
      _setDefault()
    ])
  }

  _handleLoadingError = error => {
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

App.propTypes = {
  skipLoadingScreen: PropTypes.bool
}

const AppStackNavigator = createStackNavigator({
  Home: HomeScreen,
  Activity: ActivityScreen,
  ChooseRoutineScreen: ChooseRoutineScreen,
  ChooseActivityScreen: ChooseActivityScreen,
  ParentScreen: ParentScreen,
  ChildMainMenu: ChildMainMenuScreen
})
