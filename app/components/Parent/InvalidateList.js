import React from 'react'
import { List, ListItem, Left, Text, Right, Icon, Button } from 'native-base'
import { View, Image } from 'react-native'
import { SortableListItemThumbnail } from './SortableListItemThumbnail'
import PropTypes from 'prop-types'
import { getSource } from '../../helpers/GetSource'
import { red } from '../../styles/Colors'
import images from '../../assets/images/images'

export class InvalidateList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activities: this.props.activities
    }
    if (this.props.activities == null) {
      this.state.activities = []
    }
  }

  formatTime = time => {
    if (time <= 0) {
      return '0:00'
    }

    let minutes = Math.floor(time / 60)

    let seconds = Math.floor(time % 60)
    if (seconds < 10) seconds = '0' + seconds

    return `${minutes}:${seconds}`
  }

  render () {
    console.log(this.props.activities)
    const activities = this.props.activities.map((activity, index) => (
      <ListItem button onPress={this.onItemPress} key={index}>
        <Left>
          <SortableListItemThumbnail isPhoto={activity.photo !== null} color={activity.color} source={getSource(activity)} />
          <View style={{ flex: 1 }}>
            <Text style={{ alignSelf: 'flex-start' }}>{activity.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={images.ui.star} style={[{ height: 12, width: 12, margin: 2 }, activity.reward < 1 && { tintColor: 'lightgrey' }]} />
              <Image source={images.ui.star} style={[{ height: 12, width: 12, margin: 2 }, activity.reward < 2 && { tintColor: 'lightgrey' }]} />
              <Image source={images.ui.star} style={[{ height: 12, width: 12, margin: 2 }, activity.reward < 3 && { tintColor: 'lightgrey' }]} />
              <Text style={{ alignSelf: 'flex-start' }} note numberOfLines={1}>{`- ${activity.reward ? 'Completada' : 'Falhada'} em ${this.formatTime(activity.elapsedTime)}`}</Text>
            </View>
          </View>
        </Left>
        <Right>
          <Button rounded onPress={() => this.props.onInvalidatePress(index)} style={{ backgroundColor: red }}>
            <Icon name={'md-close'} />
          </Button>
        </Right>
      </ListItem>))

    return (
      <List style={{ width: '100%' }}>
        {activities}
      </List>
    )
  }
}

InvalidateList.propTypes = {
  activities: PropTypes.array.isRequired,
  onInvalidatePress: PropTypes.func.isRequired
}
