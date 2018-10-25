import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'

const padding = Layout.window.height * 0.05

export const sliderWidth = Layout.window.height
export const itemWidth = Layout.window.height * 0.7

export const getCardStyle = (color) => {
  const cardColor = color
  return StyleSheet.create({
    card: {
      backgroundColor: cardColor,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingHorizontal: 30,
      paddingVertical: 20,
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
      paddingHorizontal: 15,
      marginTop: 4
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
      fontFamily: 'LinotteBold'
    },
    cardTitle: {
      fontFamily: 'LinotteBold',
      fontSize: 35,
      color: '#fff'
    },
    cardRoutineImage: {
      height: '120%',
      width: '70%',
      position: 'absolute',
      right: '-5%',
      bottom: '-30%',
      transform: [{ rotate: '25deg' }]
    },
    cardActivityImage: {
      height: '120%',
      width: '80%',
      position: 'absolute',
      right: '10%',
      bottom: '-30%',
      transform: [{ rotate: '-25deg' }]
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
  },
  paginationContainer: {
    height: padding,
    justifyContent: 'center',
    marginBottom: 10
  }
})
