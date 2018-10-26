import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { gray } from './Colors'

const buttonHeight = Layout.window.height * 0.12
const padding = Layout.window.height * 0.03

export const buttonStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}

export default StyleSheet.create({
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
    justifyContent: 'flex-end'
  },
  progressBarContainer: {
    flexGrow: 1,
    backgroundColor: gray,
    marginRight: padding / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: buttonHeight / 1.5,
    borderRadius: buttonHeight / 3,
    overflow: 'hidden',
    position: 'relative'
  },
  progressBarDivider: {
    borderRightColor: '#000',
    borderRightWidth: 2,
    opacity: 0.5,
    height: buttonHeight / 1.5,
    position: 'absolute'
  }
})
