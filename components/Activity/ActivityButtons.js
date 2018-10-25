import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

export class ActivityButtons extends React.Component {
  displayCorrectButton = () => {
    if (this.props.activityPaused) {
      return (<TouchableOpacity onPress={this.props.resumeActivity}>
        <Image style={styles.pauseButton} source={require('../../assets/images/nav-resume.png')} />
      </TouchableOpacity>
      )
    } else {
      return (<TouchableOpacity onPress={this.props.pauseActivity}>
        <Image style={styles.pauseButton} source={require('../../assets/images/nav-pause.png')} />
      </TouchableOpacity>
      )
    }
  }

  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }} >
        <View style={[{ flex: 1 }, styles.buttonBackground]} >
          {this.displayCorrectButton()}
        </View>
        <View style={[{ flex: 1 }, styles.buttonBackground]} >
          <TouchableOpacity onPress={this.props.cancelActivity}>
            <Image style={styles.cancelButton} source={require('../../assets/images/nav-cancel.png')} />
          </TouchableOpacity>
        </View>
        <View style={[{ flex: 1 }, styles.buttonBackground]} >
          <TouchableOpacity onPress={this.props.completeActivity} disabled={!this.props.isCompletable} >
            <Image style={styles.confirmButton} source={require('../../assets/images/nav-complete.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ActivityButtons.propTypes = {
  pauseActivity: PropTypes.func.isRequired,
  resumeActivity: PropTypes.func.isRequired,
  cancelActivity: PropTypes.func.isRequired,
  completeActivity: PropTypes.func.isRequired
}

const styles = StyleSheet.create({

  buttonBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303F9F',
    margin: 1
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
