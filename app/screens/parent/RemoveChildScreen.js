import React, { Component } from 'react'
import { Image, View, StyleSheet, Alert } from 'react-native'
import { Body, Header, Icon, Left, Right, Title, Button, Content, Container, List, Text, ListItem } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const kids = [
  { name: 'Bart', image: 'https://davidkallin.files.wordpress.com/2010/11/bart-simpson.jpg' },
  { name: 'Lisa', image: 'https://66.media.tumblr.com/aa10720452d4eb5f7999144ba6a82b83/tumblr_nczlkjyQSn1sauer5o6_250.png' },
  { name: 'Maggie', image: 'https://img.maximummedia.ie/joe_co_uk/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lY291ay5tYXhpbXVtbWVkaWEuaWUuczMuYW1hem9uYXdzLmNvbVxcXC93cC1jb250ZW50XFxcL3VwbG9hZHNcXFwvMjAxN1xcXC8xMlxcXC8xNDIwMjcxNVxcXC9tYWdnaWUtc2ltcHNvbi5wbmdcIixcIndpZHRoXCI6NzY3LFwiaGVpZ2h0XCI6NDMxLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuam9lLmNvLnVrXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvam9lY291a1xcXC9uby1pbWFnZS5wbmc_dj01XCJ9IiwiaGFzaCI6ImZmNmY2NWYxYjRjYjQyYTVjMWQ5ZGUxNGI1MGUxMmEyYjJlZjcwYjQifQ==/maggie-simpson.png' }
]

export class RemoveChildScreen extends Component {
  onItemPress = index => {
    Alert.alert(
      `Tem a certeza que pretende apagar o perfil "${kids[index].name}"`,
      'Esta ação não pode ser revertida',
      [
        { text: 'Não', onPress: () => console.log('test'), style: 'cancel' },
        { text: 'Sim', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    )
  }

  render () {
    const children = kids.map((child, index) => (
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
            {children}
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
  navigation: PropTypes.object.isRequired
  // loggedUserEmail: PropTypes.string.isRequired
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
