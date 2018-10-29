import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'

import * as Progress from 'react-native-progress'

import Layout from '../constants/Layout'

export class ChildExperienceBar extends React.Component {
  render () {
    return (
      <View>
        <View style={[styles.progressBarContainer]} >
          <Progress.Bar
            width={null}
            height={Layout.window.height * 0.12 / 1.5}
            borderRadius={0}
            borderWidth={0}
            progress={this.props.progress}
          />
          <View style={[{ left: '25%' }, styles.progressBarDivider]} />
          <View style={[{ left: '50%' }, styles.progressBarDivider]} />
          <View style={[{ left: '75%' }, styles.progressBarDivider]} />
        </View>
        <View style={styles.experienceBarCircle} >
          <Text>{this.props.level}</Text>
        </View>
      </View>
    )
  }
}

ChildExperienceBar.propTypes = {
  progress: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  progressBarContainer: {
    flexGrow: 1,
    backgroundColor: 'gray',
    marginRight: Layout.window.height * 0.03 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: Layout.window.height * 0.12 / 1.5,
    borderRadius: Layout.window.height * 0.12 / 3,
    overflow: 'hidden',
    position: 'relative'
  },
  progressBarDivider: {
    borderRightColor: '#000',
    borderRightWidth: 2,
    opacity: 0.5,
    height: Layout.window.height * 0.12 / 1.5,
    position: 'absolute'
  },
  experienceBarCircle: {
    width: Layout.window.height * 0.1,
    height: Layout.window.height * 0.1,
    borderRadius: Layout.window.height * 0.1 / 2,
    backgroundColor: 'white',
    borderColor: '#9999FF',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    left: Layout.window.width * 1.15,
    top: -Layout.window.height * 0.01,
    position: 'absolute',
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65
  }
})
