import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { backgroundColor } from './General.style'

const buttonHeight = Layout.window.width * 0.6

export default StyleSheet.create({
  mainMenuContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: backgroundColor
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
  childContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
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
    backgroundColor: '#7a9e7e',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  childName: {
    fontFamily: 'LinotteBold',
    fontSize: 30,
    color: '#000',
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
