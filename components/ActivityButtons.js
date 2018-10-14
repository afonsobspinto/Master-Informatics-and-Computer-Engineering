import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

export class ActivityButtons extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }} >
        <View style={[{ flex: 1 }, styles.buttonBackground]} >
          <TouchableOpacity onPress={this.props.pauseActivity}>
            <Image style={styles.pauseButton} source={require('../assets/images/nav-pause.png')} />
          </TouchableOpacity>
        </View>
        <View style={[{ flex: 1 }, styles.buttonBackground]} >
          <TouchableOpacity>
            <Image style={styles.cancelButton} source={require('../assets/images/nav-cancel.png')} />
          </TouchableOpacity>
        </View>
        <View style={[{ flex: 1 }, styles.buttonBackground]} >
          <TouchableOpacity>
            <Image style={styles.confirmButton} source={require('../assets/images/nav-complete.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ActivityButtons.propTypes = {
  pauseActivity: PropTypes.func.isRequired
}

const styles = StyleSheet.create({

  buttonBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303F9F',
    borderWidth: 1,
    borderColor: 'white'
  },
  pauseButton: {
    tintColor: 'white',
    width: 100,
    height: 90
  },
  cancelButton: {
    tintColor: 'white',
    width: 80,
    height: 80
  },
  confirmButton: {
    tintColor: 'white',
    width: 80,
    height: 80
  },
  resumeButton: {
    tintColor: '#303F9F',
    width: 150,
    height: 150
  }
})
