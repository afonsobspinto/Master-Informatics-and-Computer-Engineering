import React, { Component } from 'react'
import { Image, View, StyleSheet, Alert } from 'react-native'
import { Body, Header, Icon, Left, Right, Title, Button, Content, Container, List, Text, ListItem, Spinner } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EnvVars from '../../constants/EnviromentVars'
import { oppositeColor } from '../../styles/Colors'

export class RemoveChildScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      kids: [],
      loading: true
    }
  }

  onItemPress = index => {
    Alert.alert(
      `Tem a certeza que pretende apagar o perfil "${this.state.kids[index].name}"?`,
      'Esta ação não pode ser revertida',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => this.deleteChild(this.state.kids[index].id) }
      ],
      { cancelable: false }
    )
  }

  componentDidMount () {
    let url = `${EnvVars.apiUrl}routine_manager/children?userEmail=${this.props.loggedUserEmail}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.setState({ kids: JSON.parse(responseJson.response), loading: false })
        } else {

        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // TODO: quando as cenas de child ID estiverem merged, adicionar para corrigir casos em que existam dois filhos com o mesmo nome
  deleteChild (id) {
    fetch(EnvVars.apiUrl + 'routine_manager/remove-child/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        childID: id
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          console.log('crianca apagada')
          this.props.navigation.pop()
        } else {
          console.log('crianca nao apagada')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    const children = this.state.kids.map((child, index) => (
      <ListItem button onPress={() => this.onItemPress(index)} key={index}>
        <Left>
          <View style={styles.view}>
            <Image style={styles.photo} source={{ uri: child.image }} />
          </View>
          <Text>{child.name}</Text>
        </Left>
        <Body />
        <Right />
      </ListItem>
    ))

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Remover Criança</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List style={{ width: '100%' }}>
            {this.state.loading ? <Spinner color={oppositeColor} /> : children}
          </List>
        </Content>
      </Container>
    )
  }
}

export default connect(
  /* istanbul ignore next */
  state => ({
    loggedUserEmail: state.user.email
  })
)(RemoveChildScreen)

RemoveChildScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  loggedUserEmail: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  view: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  photo: {
    width: '100%',
    height: '100%'
  }
})
