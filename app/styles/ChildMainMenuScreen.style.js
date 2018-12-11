import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { backgroundColor, lighterBackgroundColor, oppositeColor } from './Colors'

const padding = Layout.window.width * 0.08
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
    backgroundColor: oppositeColor,
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
    backgroundColor: lighterBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  buttonImage: {
    height: '40%',
    width: '40%',
    tintColor: '#FFE5C9',
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
    backgroundColor: oppositeColor,
    marginRight: Layout.window.height * 0.03,
    marginBottom: Layout.window.height * 0.03
  },
  levelUpButtonImage: {
    height: '50%',
    width: '50%',
    tintColor: '#FFE5C9'
  },
  levelUpRewardImage: {
    width: '100%',
    height: '100%'
  },
  levelUpText: {
    fontFamily: 'LinotteBold',
    fontSize: padding,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    padding: Layout.window.height * 0.03,
    flex: 1
  },
  levelUpCardBottomContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  levelUpCardTitleContainer: {
    backgroundColor: lighterBackgroundColor,
    borderRadius: padding * 0.75,
    height: padding * 1.5,
    paddingHorizontal: padding * 0.75,
    elevation: 12,
    position: 'absolute',
    top: padding * 1.25,
    left: padding * 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  levelUpCardTitle: {
    fontFamily: 'LinotteBold',
    fontSize: padding,
    color: '#061111',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1
  },
  levelUpStarIcon: {
    height: padding * 0.9,
    width: padding * 0.9
  }
})
