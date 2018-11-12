import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Header, Left, Body, Right, Icon } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class CreateNewActivityScreen extends Component {
  state = {
    isDatePickerVisible: false
  }

  daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true
    })
  }

  convertToWeekDay = (dayNumber) => {
    return this.daysOfWeek[dayNumber]
  }

  handleDatePicked = (date) => {
    console.log('Chosen date: ' + this.convertToWeekDay(date.getDay()))
    this.setState({
      isDatePickerVisible: false
    })
  }

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false
    })
  }

  static navigationOptions = {
    header: null,
    drawerIcon: (
      <Image source={require('../assets/images/add-activity-icon.png')} style={{ height: 24, width: 24 }} />
    )
  };
  render () {
    return (
      <View style={{ flex: 1 }} >
        <Header style={styles.container}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Text>Criar uma nova atividade</Text>
          </Body>
          <Right />
        </Header>
        <ScrollView style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
          <View style={styles.centeredContainer}>
            <Text style={{ paddingBottom: 20 }}>Introduza os seguintes dados de forma a criar uma nova rotina.</Text>
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Nome :</Text>
            <TextInput style={{ height: 40, justifyContent: 'flex-end', width: 200, paddingHorizontal: 10, backgroundColor: 'gray', marginLeft: 20 }} placeholder='Nome da nova Atividade' />
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Dia da Tarefa :</Text>
            <TouchableOpacity onPress={this.showDatePicker}>
              <Text>Escolher data</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDatePicker}
            />
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Hora de Início :</Text>
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Duração :</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} >Categoria: </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} >Recompensa: </Text>
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Tema: </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} >Image da Atividade :</Text>
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity style={styles.centeredContainer}>
            <Text>Criar Atividade</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
    width: 150,
    height: 40
  },
  inputContainer: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  container: {
    height: 90,
    paddingTop: 15,
    backgroundColor: '#33adff'
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

CreateNewActivityScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
