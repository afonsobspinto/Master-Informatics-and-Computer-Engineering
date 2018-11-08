import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'
import CreateNewActivityScreen from './CreateNewActivityScreen'

export default class ParentScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render () {
    return (
      <ParentDrawerNavigator />

    )
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const ParentDrawerNavigator = createDrawerNavigator({
  CriarAtividade: CreateNewActivityScreen
},
{
  contentComponent: CustomDrawerComponent
})
