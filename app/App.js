import React from 'react'
import PropTypes from 'prop-types'
import { AppLoading, Font } from 'expo'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { setSettings } from './actions/settingsActions'

import { _retrieveJson } from './helpers/LocalStore'

import AppNavigator from './navigation/AppNavigator'

const store = configureStore()

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
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'LinotteBold': require('./assets/fonts/Linotte-Bold.ttf'),
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
      }),
      _retrieveJson('settings')
        .then(res => store.dispatch(setSettings(res)))
        .catch(console.log('No default settings stored'))
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
