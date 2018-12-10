import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import * as Progress from 'react-native-progress'

import * as Animatable from 'react-native-animatable'

import Layout from '../../constants/Layout'
import styles from '../../styles/RewardModal.style'
import { accentColor } from '../../styles/Colors'

const barHeight = Layout.window.width * 0.1

export class RewardModalExperienceBar extends React.Component {
  render () {
    return (
      <Animatable.View
        animation={'fadeIn'}
        delay={3400}
        style={[styles.progressBarContainer]} >
        <Progress.Bar
          width={null}
          height={barHeight}
          borderRadius={0}
          borderWidth={0}
          progress={this.props.progress}
          color={accentColor}
        />
        <View style={[{ left: '25%' }, styles.progressBarDivider]} />
        <View style={[{ left: '50%' }, styles.progressBarDivider]} />
        <View style={[{ left: '75%' }, styles.progressBarDivider]} />
      </Animatable.View>
    )
  }
}

RewardModalExperienceBar.propTypes = {
  progress: PropTypes.number.isRequired
}
