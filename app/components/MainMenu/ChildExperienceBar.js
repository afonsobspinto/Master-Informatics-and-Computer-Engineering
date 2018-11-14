import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

import * as Progress from 'react-native-progress'

import Images from '../../assets/images/images'
import Layout from '../../constants/Layout'

const barHeight = Layout.window.height * 0.08

export class ChildExperienceBar extends React.Component {
  render () {
    return (
      <View style={styles.expirienceBarContainer}>
        <View style={[styles.progressBarContainer]} >
          <Progress.Bar
            width={null}
            height={barHeight}
            borderRadius={0}
            borderWidth={0}
            progress={this.props.progress}
            color={'#700548'}
          />
          <View style={[{ left: '25%' }, styles.progressBarDivider]} />
          <View style={[{ left: '50%' }, styles.progressBarDivider]} />
          <View style={[{ left: '75%' }, styles.progressBarDivider]} />
        </View>
        <View style={styles.experienceBarCircle} >
          <Image style={styles.rewardImage} source={Images.pool} resizeMode={'cover'} />
        </View>
        <Text style={styles.levelText}>Nível {this.props.level}</Text>
      </View>
    )
  }
}

ChildExperienceBar.propTypes = {
  progress: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  expirienceBarContainer: {
    height: barHeight * 2,
    width: '100%',
    justifyContent: 'flex-end',
    paddingLeft: barHeight,
    paddingRight: barHeight * 1.5
  },
  progressBarContainer: {
    backgroundColor: 'gray',
    height: barHeight,
    width: '100%',
    borderRadius: barHeight / 2,
    elevation: 6,
    overflow: 'hidden',
    position: 'relative'
  },
  progressBarDivider: {
    borderRightColor: '#000',
    borderRightWidth: 2,
    opacity: 0.5,
    height: barHeight,
    position: 'absolute'
  },
  experienceBarCircle: {
    width: barHeight * 1.5,
    height: barHeight * 1.5,
    borderRadius: barHeight * 0.75,
    elevation: 7,
    backgroundColor: 'white',
    right: barHeight * 0.75,
    bottom: barHeight * 0.25,
    position: 'absolute',
    overflow: 'hidden'
  },
  levelText: {
    fontFamily: 'LinotteBold',
    fontSize: 18,
    height: barHeight / 2,
    color: '#000',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginLeft: barHeight / 3 + 6
  },
  rewardImage: {
    width: barHeight * 1.5,
    height: barHeight * 1.5
  }
})
