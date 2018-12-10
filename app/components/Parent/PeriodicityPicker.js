import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Item, Label, CheckBox, Text, Badge, Button } from 'native-base'
import PropTypes from 'prop-types'

const weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']

export class PeriodicityPicker extends Component {
  render () {
    const weekBadges = weekDays.map((name, index) => (
      <Button transparent style={styles.badge} onPress={() => this.props.togglePeriodicity(index)} key={index}>
        <Badge style={{ backgroundColor: this.props.periodicity.includes(index) ? this.props.color : 'transparent' }}>
          <Text style={{ color: this.props.periodicity.includes(index) ? '#fff' : '#000' }}>{name}</Text>
        </Badge>
      </Button>
    ))
    return (
      <View>
        <Item stackedLabel>
          <Label>Periodicidade</Label>
          <View style={styles.badgeContainer}>
            {weekBadges}
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Repetir</Text>
            <CheckBox checked={this.props.isRepeat} onPress={this.props.toggleIsRepeat} color={this.props.color} style={{ borderColor: this.props.color, marginRight: 25 }} />
          </View>
        </Item>
      </View>
    )
  }
}

PeriodicityPicker.propTypes = {
  isRepeat: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  periodicity: PropTypes.array.isRequired,
  togglePeriodicity: PropTypes.func.isRequired,
  toggleIsRepeat: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%'
  },
  badge: {
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 0
  }
})
