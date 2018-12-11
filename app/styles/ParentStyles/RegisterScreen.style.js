import { StyleSheet } from 'react-native'
import { backgroundColor, lightTextColor } from '../Colors'

export default StyleSheet.create({
  registerContainter: {
    backgroundColor: backgroundColor
  },
  registerTitle: {
    fontFamily: 'LinotteBold',
    fontSize: 30,
    marginBottom: '5%',
    color: lightTextColor
  },
  contentContainter: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
    left: '10%'
  },
  inputContainer: {
    marginLeft: 0
  },
  labelText: {
    fontFamily: 'LinotteBold',
    fontSize: 20,
    color: lightTextColor
  },
  submitButton: {
    marginTop: '10%'
  },
  buttonText: {
    fontFamily: 'LinotteBold',
    fontSize: 20,
    color: 'white'
  },
  loginTextContainer: {
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    fontFamily: 'LinotteBold',
    fontSize: 15,
    marginBottom: '2%',
    color: lightTextColor
  },
  loginRegisterText: {
    textDecorationLine: 'underline',
    fontFamily: 'LinotteBold',
    fontSize: 15,
    marginBottom: '2%',
    color: lightTextColor
  }
})
