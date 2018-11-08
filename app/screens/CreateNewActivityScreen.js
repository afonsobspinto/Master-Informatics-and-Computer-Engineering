import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { Header, Left, Body, Right, Icon } from 'native-base'

export default class CreateNewActivityScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render () {
    return (
      <View style={{ flex: 1 }} >
        <Header style={styles.container}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Text>Criar uma nova atividade</Text>
          </Body>
          <Right />
        </Header>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingTop: 15,
    backgroundColor: '#33adff'
  }
})

CreateNewActivityScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
