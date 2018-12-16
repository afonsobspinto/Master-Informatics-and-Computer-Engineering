import React, { Component } from 'react'
import { Body, Header, Icon, Left, Right, Title, Button, Content, Container, Text, H1, H2 } from 'native-base'
import PropTypes from 'prop-types'

export default class AboutScreen extends Component {
  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Sobre a equipa</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ marginHorizontal: 8, marginVertical: 8 }}>
          <H1>Sobre a equipa</H1>
          <Text style={{ fontSize: 14, paddingBottom: 10 }}>
            Esta aplicação foi feita possível pelo esforço conjunto da equipa de desenvolvimento e fantasticamente pacientes product owners.
          </Text>
          <H2>Product Owners</H2>
          <Text style={{ fontSize: 14, paddingBottom: 10 }}>
            • Carla Oliveira - Mestrado Integrado em Psicologia{'\n'}
            • Mariana Toste - Mestrado Integrado em Psicologia
          </Text>
          <H2>Equipa de Desenvolvimento</H2>
          <Text style={{ fontSize: 14, paddingBottom: 10 }}>
            • Afonso Pinto - @afonsobspinto{'\n'}
            • Francisco Maria - @francismaria{'\n'}
            • João Castro - @joaopscastro{'\n'}
            • Miguel Mano - @aquelemiguel{'\n'}
            • Paulo Correia - @pipas{'\n'}
            • Rui Oliveira - @ruimoliveira{'\n'}
            • Sérgio Salgado - @chaotixkilla
          </Text>
        </Content>
      </Container>
    )
  }
}

AboutScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
