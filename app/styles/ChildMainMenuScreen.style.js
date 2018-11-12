import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { green } from './Colors'
import { backgroundColor } from './General.style'

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
    overflow: 'hidden'
  },
  buttonImage: {
    height: '40%',
    width: '40%',
    tintColor: '#fff',
    marginLeft: '7%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})
