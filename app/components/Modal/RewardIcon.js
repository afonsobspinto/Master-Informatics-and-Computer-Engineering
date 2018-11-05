import React from 'react'
import { StyleSheet, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

export class RewardIcon extends React.Component {
  render () {
    let items = []

    for (let i = 0; i < this.props.rewardsCount; i++) {
      items.push(
        <View style={styles.borderSpace} key={i.toString()}>
          <Animatable.Image animation='pulse' iterationCount={6}
            style={styles.icon} source={require('../../assets/images/yellow_star.png')} />
        </View>
      )
    }

    return (
      <View style={styles.layout}>
        {items}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    paddingTop: 20
  },

  icon: {
    height: 100,
    width: 100
  },

  borderSpace: {
    paddingHorizontal: 30,
    height: 130,
    width: 160
  }
})
