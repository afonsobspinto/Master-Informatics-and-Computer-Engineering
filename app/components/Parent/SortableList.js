import React from 'react'
import { List } from 'native-base'
import { SortableListItem } from './SortableListItem'
import PropTypes from 'prop-types'

export class SortableList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: this.props.items
    }
  }

  render () {
    const items = this.props.items.map((item, index) => (<SortableListItem item={item} index={index} key={index} moveItemUp={this.props.moveItemUp} onItemPress={this.props.onItemPress} color={this.props.color} />))

    return (
      <List style={{ width: '100%' }}>
        {items}
      </List>
    )
  }
}

SortableList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func,
  color: PropTypes.string,
  moveItemUp: PropTypes.func.isRequired
}
