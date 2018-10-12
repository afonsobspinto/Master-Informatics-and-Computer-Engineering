import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'

const paddingVertical = Layout.window.height * 0.05

export const sliderWidth = Layout.window.height
export const itemWidth = Layout.window.height * 0.8

export default StyleSheet.create({
  card: {
    height: '100%',
    backgroundColor: '#0000ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: paddingVertical,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9
  },
  cardContainer: {
    height: '100%',
    paddingVertical: paddingVertical,
    paddingHorizontal: 10
  }
})
