import React from 'react'
import { connect } from 'react-redux'
import { Switch } from 'react-native'
import PropTypes from 'prop-types'
import { List, Content, ListItem, Text, Right, Body, Picker, Button } from 'native-base'
import { toggleActivityProgressType, toggleActivityTimer, toggleRoutinePlayType, toggleActivityFeedback, changeFeedbackFrequency } from '../../actions/settingsActions'

class SettingsScreen extends React.Component {
  render () {
    return (
      <Content>
        <List>
          <ListItem icon>
            <Body><Text>Adicionar nova criança</Text></Body>
            <Right>
              <Button rounded small light onPress={() => this.props.navigation.navigate('ChildFormScreen')} >
                <Text>+</Text>
              </Button>
            </Right>
          </ListItem>
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
                <Picker.Item label='Sonoro' value='sound' />
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
    routinePlayType: state.settings.routinePlayType
  }),
  dispatch => ({
    toggleActivityProgressType: () => dispatch(toggleActivityProgressType()),
    toggleActivityTimer: showTimer => dispatch(toggleActivityTimer(showTimer)),
    toggleActivityFeedback: () => dispatch(toggleActivityFeedback()),
    toggleRoutinePlayType: () => dispatch(toggleRoutinePlayType()),
    changeFeedbackFrequency: () => dispatch(changeFeedbackFrequency())
  })
)(SettingsScreen)

SettingsScreen.propTypes = {
  activityProgressType: PropTypes.string.isRequired,
  activityShowTimer: PropTypes.bool.isRequired,
  activityFeedback: PropTypes.string.isRequired,
  feedbackFrequency: PropTypes.string.isRequired,
  toggleActivityProgressType: PropTypes.func.isRequired,
  toggleActivityTimer: PropTypes.func.isRequired,
  toggleActivityFeedback: PropTypes.func.isRequired,
  changeFeedbackFrequency: PropTypes.func.isRequired,
  routinePlayType: PropTypes.string.isRequired,
  toggleRoutinePlayType: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}
