import React from 'react'
import { Switch } from 'react-native'
import PropTypes from 'prop-types'
import { Header, Container, ListItem, Text, Left, Right, Body, Icon } from 'native-base'
import styles from '../styles/ParentStyles/ParentSettings.style'

export default class GeneralSettingsScreen extends React.Component {
  static navigationOptions = { header: null }
  render () {
    return (
      <Container>
        <Header>
          <Left><Icon name='menu' style={styles.hamburguerIcon} onPress={() => this.props.navigation.openDrawer()} /></Left>
          <Body><Text style={{ color: '#E8F1F2' }}>Definições Gerais</Text></Body>
          <Right />
        </Header>
        <ListItem icon>
          <Body><Text>Visual de progresso</Text></Body>
          <Right><Switch value={false} /></Right>
        </ListItem>
        <ListItem icon>
          <Body><Text>Mostrar tempo restante</Text></Body>
          <Right><Switch value={false} /></Right>
        </ListItem>
        <ListItem icon>
          <Body><Text>Seleção de rotina</Text></Body>
          <Right><Switch value={false} /></Right>
        </ListItem>
        <ListItem icon>
          <Body><Text>Tipo de feedback</Text></Body>
          <Right><Switch value={false} /></Right>
        </ListItem>
        <ListItem icon>
          <Body><Text>Intensidade de feedback</Text></Body>
          <Right><Switch value={false} /></Right>
        </ListItem>
      </Container>
    )
  }
}

GeneralSettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
