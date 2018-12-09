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

    this.moveItemUp = this.moveItemUp.bind(this)
  }

  moveItemUp = (i) => {
    if (i === 0) return
    this.setState({ items: this.state.items.map((element, index) => {
      if (index === i - 1) return this.state.items[i]
      else if (index === i) return this.state.items[i - 1]
      else return element
    }) })
  }

  render () {
    const items = this.state.items.map((item, index) => (<SortableListItem item={item} index={index} key={index} moveItemUp={this.moveItemUp} onItemPress={this.props.onItemPress} color={this.props.color} />))

    return (
      <List style={{ width: '100%' }}>
        {items}
      </List>
    )
  }
}

SortableList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  color: PropTypes.string
}
