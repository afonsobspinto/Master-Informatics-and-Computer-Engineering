import React from 'react'
import { ListItem, Left, Text, Body, Right, Icon, Button } from 'native-base'
import PropTypes from 'prop-types'

import Images from '../../assets/images/images'
import { SortableListItemThumbnail } from './ActivityThumbnail'

export class SortableListItem extends React.Component {
  moveItemUp = () => {
    this.props.moveItemUp(this.props.index)
  }

  render () {
    return (
      <ListItem button onPress={() => console.log('memes')}>
        <Left>
          <SortableListItemThumbnail color={this.props.item.color} source={Images[this.props.item.image]} />
          <Text>{this.props.item.title}</Text>
        </Left>
        <Body />
        <Right>
          {this.props.index !== 0 && <Button onPress={this.moveItemUp}>
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
  moveItemUp: PropTypes.func.isRequired
}
