import React from 'react'
import { View, StatusBar, Image, StyleSheet, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import Layout from '../../constants/Layout'
import Modal from 'react-native-modal'
import { ShopItem } from '../MainMenu/ShopItem'

export class MainMenuProfile extends React.Component {
  render () {
    let shopItems = []

    for (let i = 0; i < 6; i++) {
      shopItems.push(
        <View key={i} style={styles.shopLayout} >
          <ShopItem cost={100} />
          <ShopItem cost={200} />
          <ShopItem cost={300} />
        </View>
      )
    }

    return (
      <View>
        <Modal isVisible={this.props.isProfileVisible} onBackdropPress={this.props.closeProfile} >
          <StatusBar hidden />
          <View style={styles.modalStyle} >
            <View style={styles.profileImageContainer} >
              <Image style={styles.profileImage} source={require('../../assets/images/placeholder-avatar.png')} />
              <View style={styles.currencyContainer} >
                <Image style={styles.currencyIcon} source={require('../../assets/images/yellow_star.png')} resizeMode='contain' />
                <Text style={styles.currencyFont} >{this.props.currencyEarned}</Text>
              </View>
            </View>
            <View style={{ flex: 2, backgroundColor: '#9999FF' }} >
              <ScrollView style={styles.shopContainer} >
                {shopItems}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

MainMenuProfile.propTypes = {
  isProfileVisible: PropTypes.bool.isRequired,
  closeProfile: PropTypes.func.isRequired,
  currencyEarned: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 10,
    borderColor: 'black',
    backgroundColor: 'white'
  },
  profileImageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Layout.window.height * 0.07,
    flexDirection: 'column',
    borderRightColor: 'black',
    borderRightWidth: 5,
    backgroundColor: '#C5CAE9'
  },
  profileImage: {
    width: Layout.window.width * 0.3,
    height: Layout.window.width * 0.3,
    borderRadius: Layout.window.width * 0.3 / 2,
    borderWidth: 2,
    borderColor: '#9999FF'
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Layout.window.height * 0.03
  },
  currencyIcon: {
    width: Layout.window.width * 0.05,
    height: Layout.window.height * 0.05,
    marginHorizontal: Layout.window.width * 0.01
  },
  currencyFont: {
    fontWeight: 'bold'
  },
  shopContainer: {
    padding: Layout.window.height * 0.02,
    flexDirection: 'column'
  },
  shopLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Layout.window.height * 0.05
  }
})
