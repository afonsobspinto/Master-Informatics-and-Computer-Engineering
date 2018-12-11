import React from 'react'
import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import Images from '../assets/images/images'
import styles from '../styles/MainMenu.style'

import { registerForPushNotificationsAsync } from '../helpers/Notification'

const kids = [
  { name: 'Bart', image: 'https://davidkallin.files.wordpress.com/2010/11/bart-simpson.jpg' },
  { name: 'Lisa', image: 'https://66.media.tumblr.com/aa10720452d4eb5f7999144ba6a82b83/tumblr_nczlkjyQSn1sauer5o6_250.png' },
  { name: 'Maggie', image: 'https://img.maximummedia.ie/joe_co_uk/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lY291ay5tYXhpbXVtbWVkaWEuaWUuczMuYW1hem9uYXdzLmNvbVxcXC93cC1jb250ZW50XFxcL3VwbG9hZHNcXFwvMjAxN1xcXC8xMlxcXC8xNDIwMjcxNVxcXC9tYWdnaWUtc2ltcHNvbi5wbmdcIixcIndpZHRoXCI6NzY3LFwiaGVpZ2h0XCI6NDMxLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuam9lLmNvLnVrXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvam9lY291a1xcXC9uby1pbWFnZS5wbmc_dj01XCJ9IiwiaGFzaCI6ImZmNmY2NWYxYjRjYjQyYTVjMWQ5ZGUxNGI1MGUxMmEyYjJlZjcwYjQifQ==/maggie-simpson.png' }
]

export default class MainMenuScreen extends React.Component {
  componentDidMount () {
    registerForPushNotificationsAsync()
  }

  render () {
    const childButtons = kids.map((kid, index) => (
      <View style={styles.childContainer} key={index}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('ChildMainMenu')}>
          <Image style={styles.buttonImage} source={{ uri: kid.image }} resizeMode={'cover'} />
        </TouchableOpacity>
        <Text style={styles.childName}>{kid.name}</Text>
      </View>))
    return (
      <View style={styles.mainMenuContainer}>
        <TouchableOpacity style={styles.infoButton} onPress={() => this.props.navigation.navigate('AppIntro')}>
          <Image style={styles.buttonImage} source={Images.ui.info} resizeMode={'contain'} />
        </TouchableOpacity>
        <ScrollView style={styles.childButtonsContainer}>
          {childButtons}
        </ScrollView>
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
