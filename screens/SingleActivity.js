import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { ScreenOrientation } from 'expo'

export default class SingleActivity extends Component {
  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)
  }
  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }
  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }} >
        <View style={{ alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', margin: 10, height: 70, backgroundColor: '#3F51B5' }} >
          <Text style={{ color: 'white', fontWeight: 'bold' }} >Progress Bar</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }} >
          <View style={{ width: 250, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C5CAE9' }} >
            <Image style={{ width: 200, height: 200 }} source={require('../assets/images/act-brush-teeth.png')} />
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }} >
            <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7986CB' }} >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }} >Brush Teeth</Text>
            </View>
            <View style={{ height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3F51B5' }} >
              <Text style={{ color: 'white', fontSize: 15 }} >15 minutes</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <View style={{ width: 120, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303F9F' }} >
                <Image style={{ tintColor: 'white', width: 90, height: 90 }} source={require('../assets/images/nav-pause.png')} />
              </View>
              <View style={{ width: 125, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303F9F' }} >
                <Image style={{ tintColor: 'white', width: 80, height: 80 }} source={require('../assets/images/nav-cancel.png')} />
              </View>
              <View style={{ width: 125, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303F9F' }} >
                <Image style={{ tintColor: 'white', width: 80, height: 80 }} source={require('../assets/images/nav-complete.png')} />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
