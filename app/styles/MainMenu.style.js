import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { backgroundColor, lightTextColor, darkerBackgroundColor } from './Colors'

const buttonHeight = Layout.window.width * 0.6

export default StyleSheet.create({
  mainMenuContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: backgroundColor
  },
  childButtonsContainer: {
    height: '100%',
    paddingTop: 30,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'red'
  },
  childScrollView: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  experienceBarContainer: {
    flex: 0
  },
  button: {
    height: buttonHeight,
    width: buttonHeight,
    borderRadius: buttonHeight / 2,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  buttonImage: {
    height: '100%',
    width: '100%'
  },
  infoButton: {
    right: 20,
    top: 20,
    position: 'absolute',
    height: 30,
    width: 30
  },
  childContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    marginBottom: 30
  },
  parentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  parentButton: {
    height: buttonHeight / 3,
    width: buttonHeight,
    borderTopLeftRadius: buttonHeight / 10,
    borderTopRightRadius: buttonHeight / 10,
    elevation: 10,
    backgroundColor: darkerBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  childName: {
    fontFamily: 'LinotteBold',
    fontSize: 30,
    color: lightTextColor,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginTop: 15
  },
  parentTooltip: {
    fontFamily: 'LinotteBold',
    fontSize: 30,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginTop: 15
  }
})
