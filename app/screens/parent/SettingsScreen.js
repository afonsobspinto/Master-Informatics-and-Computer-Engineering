import React from 'react'
import { connect } from 'react-redux'
import { Switch } from 'react-native'
import PropTypes from 'prop-types'
import { List, Content, ListItem, Text, Right, Body, Picker, Separator } from 'native-base'
import { toggleActivityProgressType, toggleActivityTimer, toggleRoutinePlayType, toggleActivityFeedback, changeFeedbackFrequency, togglePlaySounds } from '../../actions/settingsActions'
import EnvVars from '../../constants/EnviromentVars'

class SettingsScreen extends React.Component {
  componentWillUnmount () {
    fetch(EnvVars.apiUrl + 'routine_manager/settings/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: this.props.loggedUserEmail,
        activityProgressType: this.props.activityProgressType,
        activityShowTimer: this.props.activityShowTimer,
        activityFeedback: this.props.activityFeedback,
        feedbackFrequency: this.props.feedbackFrequency,
        routinePlayType: this.props.routinePlayType,
        playSounds: this.props.playSounds
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          console.log('salvo')
        } else {
          console.log('oops')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    return (
      <Content>
        <List>
          <Separator bordered>
            <Text>CRIANÇAS</Text>
          </Separator>
          <ListItem button icon onPress={() => this.props.navigation.navigate('ChildFormScreen')}>
            <Body><Text>Adicionar nova criança</Text></Body>
          </ListItem>
          <ListItem button icon onPress={() => this.props.navigation.navigate('RemoveChildScreen')}>
            <Body><Text>Remover criança</Text></Body>
          </ListItem>
          <Separator bordered>
            <Text>DEFINIÇÕES</Text>
          </Separator>
          <ListItem icon>
            <Body><Text>Visual de progresso</Text></Body>
            <Right>
              <Picker style={{ width: 125 }} selectedValue={this.props.activityProgressType} onValueChange={this.props.toggleActivityProgressType}>
                <Picker.Item label='Relógio' value='clock' />
                <Picker.Item label='Barra horizontal' value='bar' />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body><Text>Mostrar tempo restante</Text></Body>
            <Right><Switch value={this.props.activityShowTimer} onValueChange={this.props.toggleActivityTimer} /></Right>
          </ListItem>
          <ListItem icon>
            <Body><Text>Reproduzir sons</Text></Body>
            <Right><Switch value={this.props.playSounds} onValueChange={this.props.togglePlaySounds} /></Right>
          </ListItem>
          <ListItem icon>
            <Body><Text>Modo de reprodução de rotina</Text></Body>
            <Right>
              <Picker style={{ width: 125 }} selectedValue={this.props.routinePlayType} onValueChange={this.props.toggleRoutinePlayType}>
                <Picker.Item label='Escolha' value='choose' />
                <Picker.Item label='Automático' value='auto' />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body><Text>Tipo de feedback</Text></Body>
            <Right>
              <Picker style={{ width: 125 }} selectedValue={this.props.activityFeedback} onValueChange={this.props.toggleActivityFeedback}>
                <Picker.Item label='Vibração' value='vibration' />
                <Picker.Item label='Visual' value='visual' />
                <Picker.Item label='Sonoro' value='sound' enabled={this.props.playSounds} />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body><Text>Intensidade de feedback</Text></Body>
            <Right>
              <Picker style={{ width: 125 }} selectedValue={this.props.feedbackFrequency} onValueChange={this.props.changeFeedbackFrequency}>
                <Picker.Item label='Leve' value='slow' />
                <Picker.Item label='Moderado' value='normal' />
                <Picker.Item label='Intenso' value='fast' />
              </Picker>
            </Right>
          </ListItem>
        </List>
      </Content>
    )
  }
}

export default connect(
  state => ({
    activityProgressType: state.settings.activityProgressType,
    activityShowTimer: state.settings.activityShowTimer,
    activityFeedback: state.settings.activityFeedback,
    feedbackFrequency: state.settings.feedbackFrequency,
    routinePlayType: state.settings.routinePlayType,
    playSounds: state.settings.playSounds,
    loggedUserEmail: state.user.email
  }),
  dispatch => ({
    toggleActivityProgressType: () => dispatch(toggleActivityProgressType()),
    toggleActivityTimer: showTimer => dispatch(toggleActivityTimer(showTimer)),
    toggleActivityFeedback: () => dispatch(toggleActivityFeedback()),
    toggleRoutinePlayType: () => dispatch(toggleRoutinePlayType()),
    changeFeedbackFrequency: () => dispatch(changeFeedbackFrequency()),
    togglePlaySounds: () => dispatch(togglePlaySounds())
  })
)(SettingsScreen)

SettingsScreen.propTypes = {
  activityProgressType: PropTypes.string.isRequired,
  activityShowTimer: PropTypes.bool.isRequired,
  activityFeedback: PropTypes.string.isRequired,
  feedbackFrequency: PropTypes.string.isRequired,
  playSounds: PropTypes.bool.isRequired,
  toggleActivityProgressType: PropTypes.func.isRequired,
  toggleActivityTimer: PropTypes.func.isRequired,
  toggleActivityFeedback: PropTypes.func.isRequired,
  changeFeedbackFrequency: PropTypes.func.isRequired,
  routinePlayType: PropTypes.string.isRequired,
  toggleRoutinePlayType: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  togglePlaySounds: PropTypes.func.isRequired,
  loggedUserEmail: PropTypes.string.isRequired
}
