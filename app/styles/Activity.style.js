import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { gray } from './Colors'

export const buttonHeight = Layout.window.height * 0.12
export const clockHeight = Layout.window.height * 0.24
const padding = Layout.window.height * 0.03

export const buttonStyle = {
  elevation: 6,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}

export default StyleSheet.create({
  activityScreen: {
    flex: 1,
    justifyContent: 'center'
  },
  largeButton: {
    height: buttonHeight,
    aspectRatio: 1,
    borderRadius: buttonHeight / 2
  },
  smallButton: {
    height: buttonHeight / 1.5,
    aspectRatio: 1,
    borderRadius: buttonHeight / 3,
    marginRight: padding / 2
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    padding: padding,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    elevation: 1
  },
  progressBarContainer: {
    flexGrow: 1,
    backgroundColor: gray,
    marginRight: padding / 2,
    elevation: 6,
    height: buttonHeight / 1.5,
    borderRadius: buttonHeight / 3,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center'
  },
  timerClock: {
    fontFamily: 'LinotteBold',
    fontSize: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    position: 'absolute',
    padding: 6
  },
  timerBar: {
    fontFamily: 'LinotteBold',
    fontSize: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    position: 'absolute',
    padding: 6,
    left: padding
  },
  progressBarDivider: {
    borderRightColor: '#000',
    borderRightWidth: 2,
    opacity: 0.5,
    height: buttonHeight / 1.5,
    position: 'absolute'
  },
  progressClockContainer: {
    height: clockHeight + 12,
    width: clockHeight + 12,
    borderRadius: (clockHeight + 12) / 2,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: padding,
    left: padding
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    padding: padding,
    paddingLeft: padding * 1.8
  },
  title: {
    fontFamily: 'LinotteBold',
    fontSize: 50,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10
  },
  photoTitle: {
    fontFamily: 'LinotteBold',
    fontSize: 50,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15
  },
  image: {
    position: 'absolute',
    height: '60%',
    alignSelf: 'center'
  },
  photo: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignSelf: 'center'
  }
})
