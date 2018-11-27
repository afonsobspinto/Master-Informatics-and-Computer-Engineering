import React from 'react'
import { View, Image } from 'react-native'
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import styles from '../../styles/RewardModal.style'
import Images from '../../assets/images/images'

export class PastActivityIcons extends React.Component {
  filterActivities = (_, index, array) => {
    if (this.props.currentActivity + 8 > array.length) return index >= array.length - 8
    else return index >= this.props.currentActivity && index < this.props.currentActivity + 8
  }

  render () {
    let greyedOutIcons = this.props.activities
      .filter(this.filterActivities)
      .map((activity, index) => activity.status
        ? (<View key={index} style={styles.grayedOutActivityIcon} />)
        : (<View key={index} style={styles.grayedOutActivityIcon}>
          <Image style={activity.photo ? styles.grayedOutActivityPhoto : styles.grayedOutActivityImage} recizeMode={'cover'} source={activity.photo ? Images[activity.photo] : Images[activity.image]} />
        </View>)
      )

    let pastActivityIcons = this.props.activities
      .filter(this.filterActivities)
      .reduce((accumulator, activity, index) => {
        if (activity.status) {
          return {
            counter: accumulator.counter + 1,
            views: [...accumulator.views, (<Animatable.View key={index} animation={'zoomIn'} delay={600 + accumulator.counter * 1000} style={[styles.pastActivityIcon, { backgroundColor: activity.color }]}>
              <Image style={activity.photo ? styles.pastActivityPhoto : styles.pastActivityImage} recizeMode={'cover'} source={activity.photo ? Images[activity.photo] : Images[activity.image]} />
            </Animatable.View>)]
          }
        } else {
          return {
            counter: accumulator.counter,
            views: [...accumulator.views, (<View key={index} style={styles.pastActivitySpacer} />)]
          }
        }
      }, { counter: 0, views: [] }).views

    return (
      <View style={styles.pastActivitiesContainer}>
        <View style={styles.greyedOutActivitiesContainer}>
          {greyedOutIcons}
        </View>
        <View style={styles.completedActivitiesContainer}>
          {pastActivityIcons}
        </View>
      </View>
    )
  }
}

PastActivityIcons.propTypes = {
  activities: PropTypes.array.isRequired,
  currentActivity: PropTypes.number.isRequired
}
