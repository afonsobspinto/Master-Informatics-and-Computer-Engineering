import React from 'react'
import { View } from 'react-native'

import * as Progress from 'react-native-progress'

import Layout from '../constants/Layout'

export class ChildExperienceBar extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }} >
        <Progress.Bar
          width={null}
          height={Layout.window.height * 0.068}
          borderColor={'#3F51B5'}
          borderWidth={3}
          progress={0.36}
          color={'rgb(255, 195, 77)'}
          unfilledColor={'#C5CAE9'}
        />
      </View>
    )
  }
}
