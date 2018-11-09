import React, { Component } from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'
import { Header, Left, Body, Right, Icon } from 'native-base'

import PropTypes from 'prop-types'

export default class ParentHomeScreen extends Component {
  static navigationOptions = {
    header: null,
    drawerIcon: (
      <Image source={require('../assets/images/home-icon.png')} style={{ height: 24, width: 24 }} />
    )
  };
  render () {
    return (
      <View style={{ flex: 1 }} >
        <Header style={styles.container}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Text style={{ fontSize: 16 }}>Criar uma nova atividade</Text>
          </Body>
          <Right />
        </Header>
        <Text>This is the parents home screen</Text>
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

ParentHomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
