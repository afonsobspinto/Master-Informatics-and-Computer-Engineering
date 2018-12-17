import React from 'react'
import { Content, Spinner } from 'native-base'
import { InvalidateList } from '../../components/Parent/InvalidateList'
import { SelectChildPicker } from '../../components/Parent/SelectChildPicker'
import EnvVars from '../../constants/EnviromentVars'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class ActivityScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      children: [],
      activities: [],
      selectedChild: 0,
      loading: true
    }

    this.removeStars = this.removeStars.bind(this)
  }

  componentDidMount () {
    this.getChildren()
  }

  getChildren () {
    let url = `${EnvVars.apiUrl}routine_manager/children?userEmail=${this.props.loggedUserEmail}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.setState({ children: JSON.parse(responseJson.response) }, this.getActivities)
        } else {
          console.log('Ta mal')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  getActivities () {
    let url = `${EnvVars.apiUrl}routine_manager/history?id=${this.state.children[this.state.selectedChild].id}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          const activities = responseJson.response === null ? [] : JSON.parse(responseJson.response)
          this.setState({ activities, loading: false })
        } else {
          console.log('Ta mal')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  removeStars = (index) => {
    fetch(EnvVars.apiUrl + 'routine_manager/remove-stars/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.children[this.state.selectedChild].id,
        reward: this.state.activities[index].reward,
        activityID: this.state.activities[index].id
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.setState({ activities: this.state.activities.filter((_, i) => i !== index) })
        } else {

        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  onChildChanged = child => {
    this.setState({ selectedChild: child, loading: true }, this.getActivities)
  }

  render () {
    if (this.state.loading) return (<Content contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}><Spinner /></Content>)
    else {
      return (
        <Content>
          <SelectChildPicker children={this.state.children} selected={this.state.selectedChild} onChildChanged={this.onChildChanged} />
          <InvalidateList activities={this.state.activities} onInvalidatePress={this.removeStars} />
        </Content>
      )
    }
  }
}

export default connect(
  /* istanbul ignore next */
  state => ({
    loggedUserEmail: state.user.email
  })
)(ActivityScreen)

ActivityScreen.propTypes = {
  loggedUserEmail: PropTypes.string.isRequired
}
