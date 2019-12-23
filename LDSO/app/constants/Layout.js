import { Dimensions } from 'react-native'

let width = Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height
let height = Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width

export default {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375
}
