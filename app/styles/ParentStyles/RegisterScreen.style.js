import { StyleSheet } from 'react-native'
import { backgroundColor } from '../General.style'

export default StyleSheet.create({
  registerContainter: {
    backgroundColor: backgroundColor
  },
  registerTitle: {
    fontFamily: 'LinotteBold',
    fontSize: 30,
    marginBottom: '5%'
  },
  contentContainter: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
    left: '10%'
  },
  inputContainer: {
    marginBottom: '5%',
    marginRight: '5%'
  },
  labelText: {
    fontFamily: 'LinotteBold',
    fontSize: 20
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
    color: 'black',
    marginBottom: '2%'
  }
})
