import React, { Component } from 'react'
import { Text, View } from 'react-native'
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
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'grey' }} >
        <View style={{ alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', margin: 10, height: 70, backgroundColor: 'powderblue' }} >
          <Text style={{ color: 'white', fontWeight: 'bold' }} >Progress Bar</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', margin: 10 }} >
          <View style={{ width: 250, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }} >
            <Text style={{ color: 'white', fontWeight: 'bold' }} >Toothbrush Image</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'green' }} >
            <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }} >
              <Text style={{ color: 'white', fontWeight: 'bold' }} >Brush Teeth</Text>
            </View>
            <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink' }} >
              <Text style={{ color: 'white', fontWeight: 'bold' }} >15 minutes</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'violet' }} >
              <View style={{ width: 125, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }} >
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Pause Icon</Text>
              </View>
              <View style={{ width: 125, alignItems: 'center', justifyContent: 'center', backgroundColor: 'teal' }} >
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Cancel Icon</Text>
              </View>
              <View style={{ width: 125, alignItems: 'center', justifyContent: 'center', backgroundColor: 'brown' }} >
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Complete Icon</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
