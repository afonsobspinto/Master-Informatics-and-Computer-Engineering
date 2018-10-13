import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'

const paddingVertical = Layout.window.height * 0.05

export const sliderWidth = Layout.window.height
export const itemWidth = Layout.window.height * 0.4

export default StyleSheet.create({
  card: {
    height: '150%',
    backgroundColor: '#dfdfdf',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: paddingVertical / 2
  },
  cardContainer: {
    height: '80%',
    paddingVertical: paddingVertical,
    paddingHorizontal: 10
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3
  }
})
