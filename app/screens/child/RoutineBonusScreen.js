import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Confetti from 'react-native-confetti'
import { connect } from 'react-redux'
import { View } from 'react-native'

import { addStars } from '../../actions/childActions'
import { BonusModal } from '../../components/RewardsModal/BonusModal'
import { oppositeColor } from '../../styles/Colors'

export class RoutineBonusScreen extends Component {
  componentDidMount () {
    if (this._confettiView) setTimeout(() => this._confettiView.startConfetti(), 1000)
    if (this._confettiView2) setTimeout(() => this._confettiView2.startConfetti(), 1000)
    this.props.addStars(3)
  }

  componentWillUnmount () {
    if (this._confettiView) this._confettiView.stopConfetti()
    if (this._confettiView2) this._confettiView2.stopConfetti()
  }

  render () {
    return (
      <View style={{ backgroundColor: oppositeColor, height: '100%', width: '100%' }}>
        <View style={{ position: 'absolute', height: '100%', width: '50%' }}>
          <Confetti confettiCount={20} size={2} ref={ref => (this._confettiView = ref)} />
        </View>
        <View style={{ position: 'absolute', left: '50%', height: '100%', width: '50%' }}>
          <Confetti confettiCount={20} size={2} ref={ref => (this._confettiView2 = ref)} />
        </View>
        <BonusModal
          level={this.props.level}
          xp={this.props.xp}
          nextPress={() => this.props.navigation.popToTop()} />
      </View>
    )
  }
}

export default connect(
  /* istanbul ignore next */
  state => ({
    xp: state.child.xp,
    level: state.child.level
  }),
  /* istanbul ignore next */
  dispatch => ({
    addStars: stars => dispatch(addStars(stars))
  })
)(RoutineBonusScreen)

RoutineBonusScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  xp: PropTypes.number.isRequired,
  addStars: PropTypes.func.isRequired
}
