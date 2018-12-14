import React from 'react'
import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Images from '../assets/images/images'
import styles from '../styles/MainMenu.style'
import { registerForPushNotificationsAsync } from '../helpers/Notification'
import EnvVars from '../constants/EnviromentVars'
import { addChild } from '../actions/childActions'

export class MainMenuScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      kids: []
    }
  }

  componentDidMount () {
    registerForPushNotificationsAsync()
    this.getChildren()
  }

  getChildren () {
    let url = `${EnvVars.apiUrl}routine_manager/children?userEmail=${this.props.loggedUserEmail}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.setState({ kids: JSON.parse(responseJson.response)
          })
        } else {
          console.log('Ta mal')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  onChildClick = (i) => {
      console.log(this.state.kids[i])
      this.props.addChild(this.state.kids[i])
      this.props.navigation.navigate('ChildMainMenu')
  }

  render () {
    const childButtons = this.state.kids.map((kid, index) => (
      <View style={styles.childContainer} key={index}>
        <TouchableOpacity
          class='child'
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => this.onChildClick(index)}>
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

export default connect(
  /* istanbul ignore next */
  state => ({
    loggedUserEmail: state.user.email
  }),
    /* istanbul ignore next */
  dispatch => ({
    addChild: child => dispatch(addChild(child))
  })

)(MainMenuScreen)

MainMenuScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  loggedUserEmail: PropTypes.string.isRequired,
  addChild: PropTypes.func.isRequired
}
