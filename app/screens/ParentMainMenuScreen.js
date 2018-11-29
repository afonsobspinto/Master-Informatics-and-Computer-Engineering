import React from 'react'
import { Text } from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base'
import { RoutinesScreen } from './RoutinesScreen'
import ParentHomeScreen from './ParentHomeScreen'

export default class ParentMainMenuScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 'welcome'
    }
  }

  renderSelectedTab () {
    switch (this.state.selectedTab) {
      case 'welcome':
        return (<RoutinesScreen />)
      case 'profile':
        return (<ParentHomeScreen />)
      case 'login':
        return (<RoutinesScreen />)
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
            <Button active={this.state.selectedTab === 'welcome'}
              onPress={() => this.setState({ selectedTab: 'welcome' })} >
              <Text>Paulo Footer</Text>
            </Button>
            <Button active={this.selectedTab === 'profile'}
              onPress={() => this.setState({ selectedTab: 'profile' })}>
              <Icon name='cog' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
