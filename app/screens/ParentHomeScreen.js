import React from 'react'
import { Image, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Left, Body, Right, Icon } from 'native-base'

import PropTypes from 'prop-types'

import Modal from 'react-native-modal'

import styles from '../styles/ParentStyles/ParentHomeScreen.style'

export default class ParentHomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadModalVisible: false
    }
  }
  static navigationOptions = {
    header: null,
    drawerIcon: (
      <Image source={require('../assets/images/home-icon.png')} style={{ height: 24, width: 24 }} />
    )
  };

  toggleUploadPicModal = () => {
    this.setState({
      uploadModalVisible: !this.state.uploadModalVisible
    })
  }

  render () {
    return (
      <View>
        <Header style={styles.headerContainer}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Text style={{ fontSize: 16, color: 'white' }}>A minha Conta</Text>
          </Body>
          <Right />
        </Header>
        <ScrollView style={styles.generalLayout}>
          <View style={styles.centeredContainer}>
            <Image source={require('../assets/images/profile-icon.png')} style={styles.profileImgContainer} />
            <TouchableOpacity onPress={this.toggleUploadPicModal}>
              <Text>Alterar Foto de Pefil</Text>
            </TouchableOpacity>
            <Modal
              isVisible={this.state.uploadModalVisible}>
              <TouchableOpacity onPress={this.toggleUploadPicModal} style={styles.closeBtn}>
                <Text>EXIT</Text>
              </TouchableOpacity>
              <View style={styles.modalLayout}>
                <View>
                  <Text>Upload Picture</Text>
                </View>
                <View>
                  <Text>Take photo</Text>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    )
  }
}

ParentHomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
