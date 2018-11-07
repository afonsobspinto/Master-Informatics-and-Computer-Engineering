import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { green } from './Colors'
import { backgroundColor } from './General.style'

const padding = Layout.window.height * 0.05
const buttonHeight = Layout.window.height * 0.12

export default StyleSheet.create({
  rewardsModal: {
    backgroundColor: 'transparent',
    position: 'relative'
  },
  rewardCard: {
    backgroundColor: backgroundColor,
    alignItems: 'center',
    borderRadius: padding / 2,
    flexGrow: 1,
    elevation: 6,
    marginVertical: padding * 2,
    marginHorizontal: padding * 3,
    position: 'relative'
  },
  rewardContainer: {
    height: padding * 3.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    elevation: 7
  },
  icon: {
    height: padding * 2.5,
    width: padding * 2.5,
    marginHorizontal: 5
  },
  iconGreyedOut: {
    tintColor: '#ccc5b9'
  },
  iconCenter: {
    height: padding * 3,
    width: padding * 3
  },
  cardTitle: {
    fontFamily: 'LinotteBold',
    fontSize: 40,
    color: '#000',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginHorizontal: 30,
    marginTop: padding * 2
  },
  button: {
    elevation: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: buttonHeight,
    aspectRatio: 1,
    borderRadius: buttonHeight / 2,
    backgroundColor: green,
    position: 'absolute',
    bottom: 3 * padding,
    right: 3 * padding - buttonHeight / 3
  },
  buttonImage: {
    height: '50%',
    width: '50%',
    tintColor: '#fff'
  },
  pastActivityIcon: {
    height: buttonHeight / 2,
    width: buttonHeight / 2,
    borderRadius: buttonHeight / 4,
    backgroundColor: '#7fb800',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  pastActivityImage: {
    height: '60%',
    width: '60%'
  },
  pastActivityContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: padding + buttonHeight / 4,
    right: buttonHeight * (2 / 3) + 5
  }
})
