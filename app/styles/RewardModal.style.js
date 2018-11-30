import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { grayedOut, oppositeColor, accentColor, backgroundColor } from './Colors'

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
    height: padding * 4.6 + buttonHeight / 4,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    elevation: 7,
    overflow: 'hidden'
  },
  icon: {
    height: padding * 2.5,
    width: padding * 2.5,
    marginHorizontal: 5,
    bottom: padding * 1.1 + buttonHeight / 4,
    opacity: 0
  },
  iconGreyedOut: {
    tintColor: grayedOut,
    opacity: 1
  },
  iconCenter: {
    height: padding * 3,
    width: padding * 3
  },
  cardTitle: {
    fontFamily: 'LinotteBold',
    fontSize: 40,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginHorizontal: 30,
    top: padding * 2.6,
    textAlign: 'center',
    position: 'absolute'
  },
  button: {
    elevation: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: buttonHeight,
    aspectRatio: 1,
    borderRadius: buttonHeight / 2
  },
  nextButton: {
    backgroundColor: accentColor
  },
  backButton: {
    backgroundColor: oppositeColor,
    marginRight: 3 * padding
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 2 * padding - buttonHeight / 2,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7
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
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    overflow: 'hidden',
    opacity: 1
  },
  grayedOutActivityIcon: {
    height: buttonHeight / 2,
    width: buttonHeight / 2,
    borderRadius: buttonHeight / 4,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: grayedOut,
    overflow: 'hidden'
  },
  pastActivityImage: {
    height: '60%',
    width: '60%'
  },
  pastActivityPhoto: {
    height: '100%',
    width: '100%'
  },
  pastActivitySpacer: {
    height: buttonHeight / 2,
    width: buttonHeight / 2,
    marginHorizontal: 5
  },
  grayedOutActivityImage: {
    height: '60%',
    width: '60%',
    opacity: 0.3
  },
  grayedOutActivityPhoto: {
    height: '100%',
    width: '100%',
    opacity: 0.3
  },
  pastActivitiesContainer: {
    position: 'absolute',
    bottom: 2 * padding
  },
  completedActivitiesContainer: {
    flexDirection: 'row',
    marginTop: padding,
    position: 'absolute'
  },
  greyedOutActivitiesContainer: {
    flexDirection: 'row',
    marginTop: padding
  },
  progressBarContainer: {
    backgroundColor: 'gray',
    height: buttonHeight / 2,
    width: buttonHeight * 4 + 80,
    borderRadius: buttonHeight / 4,
    elevation: 6,
    overflow: 'hidden',
    position: 'absolute',
    top: 2.5 * padding
  },
  progressBarDivider: {
    borderRightColor: '#000',
    borderRightWidth: 2,
    opacity: 0.5,
    height: buttonHeight / 2,
    position: 'absolute'
  }
})
