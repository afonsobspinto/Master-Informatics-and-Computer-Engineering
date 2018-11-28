import React from 'react'
import { Text } from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button } from 'native-base'
import { RoutinesScreen } from './RoutinesScreen'

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
        return (<RoutinesScreen />)
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
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
