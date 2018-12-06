import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import * as Animatable from 'react-native-animatable'

import styles from '../../styles/RewardModal.style'
import Images from '../../assets/images/images'

export class RewardModalStars extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      animations: [
        !(this.props.activities[this.props.currentActivity].status && this.props.activities[this.props.currentActivity].status.reward < 1),
        !(this.props.activities[this.props.currentActivity].status && this.props.activities[this.props.currentActivity].status.reward < 2),
        !(this.props.activities[this.props.currentActivity].status && this.props.activities[this.props.currentActivity].status.reward < 3)
      ]
    }

    this.unmount = false
    this.stars = []
  }

  componentDidMount () {
    /* istanbul ignore next */
    setTimeout(() => {
      if (this.state.animations[0] && !this.unmount) {
        this.stars[0].zoomIn(1000).then(() => {
          if (this.state.animations[1] && !this.unmount) {
            this.stars[1].zoomIn(1000).then(() => {
              if (this.state.animations[2] && !this.unmount) {
                this.stars[2].zoomIn(1000)
              }
            })
          }
        })
      }
    }, 400)

    for (let i = 0; i < 3; i++) {
      /* istanbul ignore next */
      setTimeout(() => { if (this.state.animations[i] && !this.unmount) this.stars[i].bounceOutDown(2000) }, 4000 + i * 400)
      /* istanbul ignore next */
      setTimeout(() => { if (this.state.animations[i] && !this.unmount) this.props.increaseProgress(i + 1) }, 4400 + i * 400)
    }
  }

  componentWillUnmount () {
    this.unmount = true
  }

  render () {
    return (
      <View style={styles.rewardContainer}>
        <Animatable.Image
          ref={ref => (this.stars.push(ref))}
          style={styles.icon}
          resizeMode={'center'}
          source={Images.ui.star} />
        <Animatable.Image
          ref={ref => (this.stars.push(ref))}
          style={[styles.icon, styles.iconCenter]}
          resizeMode={'center'}
          source={Images.ui.star} />
        <Animatable.Image
          ref={ref => (this.stars.push(ref))}
          style={styles.icon}
          resizeMode={'center'}
          source={Images.ui.star} />
      </View>
    )
  }
}

RewardModalStars.propTypes = {
  activities: PropTypes.array.isRequired,
  currentActivity: PropTypes.number.isRequired,
  increaseProgress: PropTypes.func.isRequired
}
