import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'

export default StyleSheet.create({
  mainMenuContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#C5CAE9'
  },
  experienceBarContainer: {
    marginHorizontal: Layout.window.width * 0.2,
    marginVertical: Layout.window.height * 0.075
  },
  profileImageContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.window.height * 0.025
  },
  profileImage: {
    width: Layout.window.width * 0.4,
    height: Layout.window.width * 0.4,
    borderRadius: Layout.window.width * 0.4 / 2,
    borderWidth: 1
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  currencyIcon: {
    width: Layout.window.width * 0.06,
    height: Layout.window.height * 0.06,
    marginHorizontal: Layout.window.width * 0.02
  },
  currencyFont: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  playButton: {
    tintColor: '#9999FF'
  },
  playButtonContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
