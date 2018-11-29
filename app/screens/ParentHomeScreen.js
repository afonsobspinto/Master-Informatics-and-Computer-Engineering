import React from 'react'
import { Image, View, Text, ScrollView, TouchableOpacity } from 'react-native'

import Modal from 'react-native-modal'

import styles from '../styles/ParentStyles/ParentHomeScreen.style'

export default class ParentHomeScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      name: 'Nome Da Pessoa',
      email: 'email@hotmail.com',
      uploadModalVisible: false
    }
  }

  setName = (newName) => {
    this.setState({
      name: newName
    })
  }

  setEmail = (newEmail) => {
    this.setState({
      email: newEmail
    })
  }

  toggleUploadPicModal = () => {
    this.setState({
      uploadModalVisible: !this.state.uploadModalVisible
    })
  }

  render () {
    console.log('chegou aqui + HOME SCREEN')
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.generalLayout}>
          <View style={styles.centeredContainer}>
            <Image source={require('../assets/images/profile-icon.png')} style={styles.profileImgContainer} />
            <TouchableOpacity onPress={this.toggleUploadPicModal}>
              <Text>Alterar Foto de Pefil</Text>
            </TouchableOpacity>
            <Modal
              style={styles.uploadModal}
              isVisible={this.state.uploadModalVisible}>
              <TouchableOpacity onPress={this.toggleUploadPicModal} style={{ alignSelf: 'flex-end' }}>
                <Image source={require('../assets/images/icons/close-button.png')} style={styles.closeBtn} />
              </TouchableOpacity>
              <View style={styles.modalLayout}>
                <View style={styles.modalIconContainer}>
                  <Image source={require('../assets/images/icons/upload.png')} style={styles.modalIcon} />
                  <Text>Upload Picture</Text>
                </View>
                <View style={styles.modalIconContainer}>
                  <Image source={require('../assets/images/icons/camera.png')} style={styles.modalIcon} />
                  <Text>Take photo</Text>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.descriptionBox}>
              <Text>Informação Geral</Text>
            </View>
            <View style={[styles.infoContainer, styles.rowDirection]}>
              <Text style={{ flex: 1 }}>Nome</Text>
              <Text style={{ flex: 1 }}>{this.state.name}</Text>
            </View>
            <View style={[styles.infoContainer, styles.rowDirection]}>
              <Text style={{ flex: 1 }}>E-mail</Text>
              <Text style={{ flex: 1 }}>{this.state.email}</Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.descriptionBox}>
              <Text>Repor Definições</Text>
            </View>
            <View style={[styles.infoContainer, styles.rowDirection]}>
              <Text style={{ flex: 1 }}>Repor E-mail</Text>
              <Text style={{ flex: 1 }}>{this.state.email}</Text>
              <View style={styles.arrowContainer}>
                <TouchableOpacity>
                  <Image source={require('../assets/images/icons/slide-arrow.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.infoContainer, styles.rowDirection]}>
              <Text style={{ flex: 3 }}>Repor Palavra-passe</Text>
              <Text style={{ flex: 1 }}>********</Text>
              <View style={styles.arrowContainer}>
                <TouchableOpacity >
                  <Image source={require('../assets/images/icons/slide-arrow.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
