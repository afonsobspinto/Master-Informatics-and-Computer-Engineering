import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { green, avatarBlue } from './Colors'
import { backgroundColor } from './General.style'

const padding = Layout.window.height * 0.05
const buttonHeight = Layout.window.width * 0.5

export default StyleSheet.create({
  mainMenuContainer: {
    flex: 1,
    flexDirection: 'column',
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
    backgroundColor: green,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  profileButton: {
    height: buttonHeight,
    width: buttonHeight,
    borderRadius: buttonHeight / 2,
    elevation: 10,
    backgroundColor: avatarBlue,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  buttonImage: {
    height: '40%',
    width: '40%',
    tintColor: '#fff',
    marginLeft: '7%'
  },
  profileImage: {
    width: buttonHeight * 1.5,
    height: buttonHeight * 1.5,
    position: 'absolute',
    top: 0
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  levelUpModal: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: '100%',
    width: '100%'
  },
  levelUpCard: {
    backgroundColor: backgroundColor,
    alignItems: 'center',
    borderRadius: padding / 2,
    flexGrow: 1,
    elevation: 6,
    marginVertical: padding * 2,
    marginHorizontal: padding * 3,
    overflow: 'hidden',
    position: 'relative'
  },
  modalContainer: {
    elevation: 99,
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  levelUpButton: {
    elevation: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Layout.window.height * 0.12,
    aspectRatio: 1,
    borderRadius: Layout.window.height * 0.06,
    backgroundColor: green,
    position: 'absolute',
    bottom: Layout.window.height * 0.03,
    right: Layout.window.height * 0.03
  },
  levelUpButtonImage: {
    height: '50%',
    width: '50%',
    tintColor: '#fff'
  },
  levelUpRewardImage: {
    width: '100%',
    height: '100%'
  },
  levelUpText: {
    fontFamily: 'LinotteBold',
    fontSize: 35,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    padding: Layout.window.height * 0.03,
    position: 'absolute',
    top: 0,
    left: 0
  }
})
