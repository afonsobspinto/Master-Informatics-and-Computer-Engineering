import React from 'react'
import { Content, Spinner } from 'native-base'
import { SortableList } from '../../components/Parent/SortableList'
import { PropTypes } from 'prop-types'
import { SelectChildPicker } from '../../components/Parent/SelectChildPicker'
import EnvVars from '../../constants/EnviromentVars'

export class RoutinesScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      children: [],
      selectedChild: 0,
      routines: [],
      loading: true
    }

    this.moveItemUp = this.moveItemUp.bind(this)

    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.setState({ loading: true }, this.getChildren)
      }
    )
  }

  componentWillMount () {
    this.getChildren()
  }

  getChildren () {
    let url = `${EnvVars.apiUrl}routine_manager/children?userEmail=${this.props.loggedUserEmail}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.setState({ children: JSON.parse(responseJson.response) }, this.fetchChildRoutine)
        } else {

        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  fetchChildRoutine = () => {
    let url = `${EnvVars.apiUrl}routine_manager/routine?selectedChildID=${this.state.children[this.state.selectedChild].id}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          console.log(responseJson.response)
          this.setState({ routines: JSON.parse(responseJson.response), loading: false })
        } else {

        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  moveItemUp = (i) => {
    if (i === 0) return
    this.setState({ routines: this.state.routines.map((element, index) => {
      if (index === i - 1) return this.state.routines[i]
      else if (index === i) return this.state.routines[i - 1]
      else return element
    }) }, () => {
      let url = `${EnvVars.apiUrl}routine_manager/switch-routine-weight`
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstRoutineID: this.state.routines[i].id,
          secondRoutineID: this.state.routines[i - 1].id
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === '200') {
            console.log('trocado')
          } else {
            console.log('nao trocado')
          }
          return responseJson
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }

  onRoutinePress = (index) => {
    this.props.navigation.navigate('RoutineFormScreen', { routine: this.state.routines[index] })
  }

  onChildChanged = child => {
    this.setState({ selectedChild: child, loading: true }, this.fetchChildRoutine)
  }

  render () {
    if (this.state.loading) return (<Content contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}><Spinner /></Content>)
    else {
      return (
        <Content>
          <SelectChildPicker hideStatus children={this.state.children} selected={this.state.selectedChild} onChildChanged={this.onChildChanged} />
          <SortableList items={this.state.routines} onItemPress={this.onRoutinePress} moveItemUp={this.moveItemUp} />
        </Content>
      )
    }
  }
}

RoutinesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  loggedUserEmail: PropTypes.string.isRequired
}
