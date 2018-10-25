import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'

const buttonHeight = Layout.window.height * 0.15
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
    bottom: padding,
    right: padding,
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
})
