import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { ScreenOrientation } from 'expo'

export default class SingleActivity extends Component {
  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)
  }
  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }
  render () {
    let pic = {
      uri: 'http://bpic.588ku.com/element_pic/16/12/30/ac150585ba02eb068854fdcdc2bd2bb0.jpg'
    }
    return (
      <View>
        <Text>Lavar os dentes</Text>
        <Text>15 minutos</Text>
        <Image source={pic} style={{ width: 200, height: 200 }} />
      </View>
    )
  }
}
