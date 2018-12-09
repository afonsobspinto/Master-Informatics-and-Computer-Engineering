import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import PropTypes from 'prop-types'

import Images from '../assets/images/images'
import styles from '../styles/MainMenu.style'

export default class MainMenuScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainMenuContainer}>
        <TouchableOpacity style={styles.infoButton} onPress={() => this.props.navigation.navigate('AppIntro')}>
          <Image style={styles.buttonImage} source={Images.ui.info} />
        </TouchableOpacity>
        <View style={styles.childContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('ChildMainMenu')}>
            <Image style={styles.buttonImage} source={Images.child} resizeMode={'contain'} />
          </TouchableOpacity>
          <Text style={styles.childName}>Miguel</Text>
        </View>
        <View style={styles.parentContainer}>
          <TouchableOpacity
            style={styles.parentButton}
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('ParentMainMenu')}>
            <Text style={styles.parentTooltip}>Zona de pai</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

MainMenuScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
