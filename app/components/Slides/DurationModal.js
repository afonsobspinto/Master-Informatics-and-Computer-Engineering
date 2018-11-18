import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export class DurationModal extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedItem: 1,
      itemsList: ['1', '2', '3']
    }
  }

  componentDidMount () {
  }

  initItemsList = () => {
    let filledListValues = []
    for (let i = 0; i < 60; i++) {
      filledListValues.push(i)
    }
    let newItems = this.state.itemsList.concat(filledListValues)
    this.setState({
      itemsList: newItems
    })
    console.log('ahahah' + this.state.itemsList)
  }

  onPickerSelect = (index) => {

  }
  render () {
    return (
      <View style={{ padding: 10 }}>
        <Text style={styles.centeredElement}>Escolha a duração da atividade</Text>
        <View style={[styles.centeredElement, { justifyContent: 'flex-end' }]}>

          <TouchableOpacity onPress={this.props.closeModalCallback}>
            <Text>EXIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centeredElement: {
    alignSelf: 'center'
  }
})

DurationModal.propTypes = {
  closeModalCallback: PropTypes.func.isRequired
}
