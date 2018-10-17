import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'

const padding = Layout.window.height * 0.05

export const sliderWidth = Layout.window.height
export const itemWidth = Layout.window.height * 0.6

export const getCardStyle = (color) => {
  const cardColor = color
  return StyleSheet.create({
    card: {
      backgroundColor: cardColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: padding / 2,
      flexGrow: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6
    },
    cardContainer: {
      flexGrow: 1,
      paddingTop: padding,
      paddingBottom: 10,
      paddingHorizontal: padding / 2
    },
    playButton: {
      backgroundColor: '#fff',
      height: 40,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15
    },
    playIcon: {
      tintColor: cardColor,
      height: 15,
      width: 15,
      marginRight: 5
    },
    playText: {
      color: cardColor,
      fontSize: 20,
      fontFamily: 'Baloo'
    },
    cardTitle: {
      fontFamily: 'Baloo',
      fontSize: 35,
      color: '#fff'
    },
    cardContent: {
      position: 'absolute',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      left: 30,
      top: 20
    },
    cardImage: {
      height: '120%',
      width: '70%',
      position: 'absolute',
      right: '-5%',
      bottom: '-30%',
      transform: [{ rotate: '25deg' }]
    },
    dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5
    },
    carouselContainer: {
      flexDirection: 'column',
      height: '100%'
    }
  })
}

export default StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  carouselContainer: {
    flexDirection: 'column',
    height: '100%'
  }
})
