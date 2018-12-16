import React from 'react'
import { Content } from 'native-base'
import { InvalidateList } from '../../components/Parent/InvalidateList'
import { SelectChildPicker } from '../../components/Parent/SelectChildPicker'
import EnvVars from '../../constants/EnviromentVars'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const activities = [
  {
    title: 'Fazer a cama',
    photo: 'https://hniesfp.imgix.net/8/images/detailed/14/EA1A7075.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format,compress',
    color: '#7d84b2',
    time: {
      min: 0,
      max: 120,
      goal: 60
    },
    reward: 3,
    elapsedTime: 40
  },
  {
    title: 'Lavar os dentes',
    image: 'toothbrush',
    color: '#0e79b2',
    time: {
      min: 1,
      max: 15,
      goal: 10
    },
    reward: 3,
    elapsedTime: 120
  },
  {
    title: 'Vestir',
    image: 'socks',
    color: '#7fb800',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 2,
    elapsedTime: 40
  },
  {
    title: 'Tomar banho',
    image: 'shower',
    color: '#37c1f0',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 3,
    elapsedTime: 34
  },
  {
    title: 'Preparar a mochila',
    image: 'bag',
    color: '#e43f6f',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 0,
    elapsedTime: 3000
  },
  {
    title: 'Calçar os sapatos',
    image: 'sneakers',
    color: '#4bb3fd',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 3,
    elapsedTime: 20
  },
  {
    title: 'Tomar o pequeno almoço',
    image: 'breakfast',
    color: '#ff7f11',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 3,
    elapsedTime: 242
  },
  {
    title: 'Pentear cabelo',
    image: 'comb',
    color: '#b0db43',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 2,
    elapsedTime: 27
  }
]
const kids = []

export class ActivityScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      children: kids,
      activities: activities,
      selectedChild: 0
    }
  }

  componentDidMount () {
    this.getChildren()
    this.getActivities()
  }

  getChildren () {
    let url = `${EnvVars.apiUrl}routine_manager/children?userEmail=${this.props.loggedUserEmail}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.setState({ children: JSON.parse(responseJson.response)
          })
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
    console.log(this.state.children[this.state.selectedChild])
    let url = `${EnvVars.apiUrl}routine_manager/history?id=${this.state.children[this.state.selectedChild].id}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.setState({ activities: JSON.parse(responseJson.response)
          })
        } else {
          console.log('Ta mal')
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
        <SelectChildPicker children={this.state.children} selected={this.state.selectedChild} onChildChanged={child => this.setState({ selectedChild: child })} />
        <InvalidateList activities={activities} onInvalidatePress={index => console.log(index)} />
      </Content>
    )
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
