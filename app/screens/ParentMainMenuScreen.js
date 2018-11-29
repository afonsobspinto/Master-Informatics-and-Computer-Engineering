import React from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base'
import { RoutinesScreen } from './RoutinesScreen'
import ParentHomeScreen from './ParentHomeScreen'
import CreateNewActivityScreen from './CreateNewActivityScreen'

export default class ParentMainMenuScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 'initial'
    }
  }

  renderSelectedTab () {
    switch (this.state.selectedTab) {
      case 'initial':
        return (<View><Text>Ecrã Inicial</Text></View>)
      case 'routines':
        return (<RoutinesScreen />)
      case 'profile':
        return (<ParentHomeScreen />)
      case 'createNewActivity':
        return (<CreateNewActivityScreen />)
      case 'createNewRoutine':
        /* return (<CreateNewRoutine  />) */
    }
  }

  render () {
    return (
      <Container>
        <Header />
        <Content>
          {this.renderSelectedTab()}
        </Content>
        <Footer>
          <FooterTab>
            <Button active={this.state.selectedTab === 'initial'}
              onPress={() => this.setState({ selectedTab: 'initial' })} >
              <Icon name='home' />
              <Text>Ecrã Inicial</Text>
            </Button>
            <Button active={this.state.selectedTab === 'routines'}
              onPress={() => this.setState({ selectedTab: 'routines' })} >
              <Icon name='apps' />
              <Text>Rotinas</Text>
            </Button>
            <Button active={this.selectedTab === 'profile'}
              onPress={() => this.setState({ selectedTab: 'profile' })}>
              <Icon name='cog' />
              <Text>Definições</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
