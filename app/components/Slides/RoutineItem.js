import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { Body, Left, Right, Thumbnail, ListItem, Button } from 'native-base'

export class RoutineItem extends React.Component {
  render () {
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={this.props.image} />
        </Left>
        <Body>
          <Text>{this.props.title}</Text>
        </Body>
        <Right>
          <Button transparent>
            <Text>View</Text>
          </Button>
        </Right>
      </ListItem>
    )
  }
}

RoutineItem.propTypes = {
  image: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired
}
