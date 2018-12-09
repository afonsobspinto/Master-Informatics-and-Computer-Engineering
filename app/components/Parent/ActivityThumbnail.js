import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'

export class SortableListItemThumbnail extends React.Component {
  styles = StyleSheet.create({
    view: {
      height: 50,
      width: 50,
      borderRadius: 25,
      marginRight: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: '60%',
      height: '60%'
    }
  })

  render () {
    return (
      <View style={[this.styles.view, { backgroundColor: this.props.color }]}>
        <Image source={this.props.source} style={this.styles.image} resizeMode={'contain'} />
      </View>
    )
  }
}

SortableListItemThumbnail.propTypes = {
  color: PropTypes.string.isRequired,
  source: PropTypes.number.isRequired
}
