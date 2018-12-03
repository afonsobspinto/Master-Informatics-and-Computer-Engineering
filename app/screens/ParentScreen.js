import React from 'react'
import { View, Image, SafeAreaView, ScrollView } from 'react-native'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'

import CreateNewActivityScreen from './CreateNewActivityScreen'
import ParentHomeScreen from './ParentHomeScreen'
import GeneralSettingsScreen from './GeneralSettingsScreen'

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
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 200, backgroundColor: 'white', paddingTop: 40 }}>
      <Image source={require('../assets/images/profile-pic-default.png')} style={{ height: 120, width: 120, alignSelf: 'center' }} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const ParentDrawerNavigator = createDrawerNavigator({
  'A Minha Conta': ParentHomeScreen,
  'Definições Gerais': GeneralSettingsScreen,
  'Criar Nova Atividade': CreateNewActivityScreen
},
{
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: '#006494'
  }
})
