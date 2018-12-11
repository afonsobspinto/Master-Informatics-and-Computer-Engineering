import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'

export class SortableListItemThumbnail extends React.Component {
  render () {
    return (
      <View style={[styles.view, { backgroundColor: this.props.color }]}>
        <Image source={this.props.source} style={this.props.isPhoto ? styles.photo : styles.image} resizeMode={'cover'} />
      </View>
    )
  }
}

SortableListItemThumbnail.propTypes = {
  color: PropTypes.string.isRequired,
  source: PropTypes.any.isRequired,
  isPhoto: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
  view: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  image: {
    width: '60%',
    height: '60%'
  },
  photo: {
    width: '100%',
    height: '100%'
  }
})
