import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { Container, Header, Footer, FooterTab, Button, Icon, Title, Body, Text } from 'native-base'
import { RoutinesScreen } from './RoutinesScreen'
import RewardsScreen from './RewardsScreen'
import ActivityScreen from './ActivityScreen'
import SettingsScreen from './SettingsScreen'
import ActionButton from 'react-native-action-button'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setRoutines } from '../../actions/userActions'

export class ParentMainMenuScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 'activity',
      title: 'Atividade'
    }
  }

  renderSelectedTab = () => {
    switch (this.state.selectedTab) {
      case 'activity':
        return (<ActivityScreen />)
      case 'routines':
        return (<RoutinesScreen navigation={this.props.navigation} loggedUserEmail={this.props.loggedUserEmail} setRoutines={this.props.setRoutines} />)
      case 'rewards':
        return (<RewardsScreen />)
      case 'settings':
        return (<SettingsScreen navigation={this.props.navigation} loggedUserEmail={this.props.loggedUserEmail} />)
    }
  }

  getCorrespondingActionButton = () => {
    if (this.state.selectedTab === 'routines') {
      return (
        <ActionButton style={styles.actionButton} buttonColor='rgba(231,76,60,1)'>
          <ActionButton.Item className='newActivity' buttonColor='#9b59b6' title='Criar atividade' onPress={() => this.props.navigation.navigate('ActivityFormScreen')}>
            <Icon name='md-list-box' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item className='newRoutine' buttonColor='#1abc9c' title='Criar rotina' onPress={() => this.props.navigation.navigate('RoutineFormScreen')}>
            <Icon name='md-calendar' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      )
    } else if (this.state.selectedTab === 'rewards') {
      return (
        <ActionButton style={styles.actionButton} buttonColor='rgba(231,76,60,1)'>
          <ActionButton.Item className='newReward' buttonColor='#9b59b6' title='Criar prémio' onPress={() => this.props.navigation.navigate('RewardFormScreen')}>
            <Icon name='md-trophy' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      )
    }
  }

  render () {
    return (
      <Container>
        <StatusBar hidden={false} />
        <Header>
          <Body>
            <Title>{this.state.title}</Title>
          </Body>
        </Header>
        {this.renderSelectedTab()}
        <Footer>
          <FooterTab>
            <Button className='activity' active={this.state.selectedTab === 'activity'}
              onPress={() => this.setState({ selectedTab: 'activity', title: 'Atividade' })} >
              <Icon name='md-filing' />
              <Text>Atividades</Text>
            </Button>
            <Button className='routines' active={this.state.selectedTab === 'routines'}
              onPress={() => this.setState({ selectedTab: 'routines', title: 'Gerir Rotinas' })} >
              <Icon name='md-apps' />
              <Text>Rotinas</Text>
            </Button>
            <Button className='rewards' active={this.state.selectedTab === 'rewards'}
              onPress={() => this.setState({ selectedTab: 'rewards', title: 'Recompensas' })} >
              <Icon name='md-trophy' />
              <Text>Prémios</Text>
            </Button>
            <Button className='settings' active={this.state.selectedTab === 'settings'}
              onPress={() => this.setState({ selectedTab: 'settings', title: 'Opções' })}>
              <Icon name='md-settings' />
              <Text>Opções</Text>
            </Button>
          </FooterTab>
        </Footer>
        {this.getCorrespondingActionButton()}
      </Container>
    )
  }
}

export default connect(
  /* istanbul ignore next */
  state => ({
    loggedUserEmail: state.user.email
  }),
  dispatch => ({
    setRoutines: routines => dispatch(setRoutines(routines))
  })
)(ParentMainMenuScreen)

ParentMainMenuScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  loggedUserEmail: PropTypes.string.isRequired,
  setRoutines: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  actionButton: {
    marginBottom: 55
  }
})
