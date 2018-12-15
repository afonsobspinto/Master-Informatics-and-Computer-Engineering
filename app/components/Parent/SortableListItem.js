import React from 'react'
import { ListItem, Left, Text, Body, Right, Icon, Button } from 'native-base'
import PropTypes from 'prop-types'
import { SortableListItemThumbnail } from './SortableListItemThumbnail'
import { getSource } from '../../helpers/GetSource'

export class SortableListItem extends React.Component {
  onItemPress = () => {
    this.props.onItemPress(this.props.index)
  }

  moveItemUp = () => {
    this.props.moveItemUp(this.props.index)
  }

  render () {
    return (
      <ListItem button onPress={this.onItemPress}>
        <Left>
          <SortableListItemThumbnail isPhoto={this.props.item.photo !== null} color={this.props.item.color} source={getSource(this.props.item)} />
          <Text>{this.props.item.title}</Text>
        </Left>
        <Body />
        <Right>
          {this.props.index !== 0 && <Button onPress={this.moveItemUp} style={this.props.color && { backgroundColor: this.props.color }}>
            <Icon name={'md-arrow-dropup'} />
          </Button>}
        </Right>
      </ListItem>
    )
  }
}

SortableListItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  moveItemUp: PropTypes.func.isRequired,
  onItemPress: PropTypes.func.isRequired,
  color: PropTypes.string
}
