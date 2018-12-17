import React from 'react'
import { Content, Spinner } from 'native-base'
import { Alert } from 'react-native'
import { SortableList } from '../../components/Parent/SortableList'
import { PropTypes } from 'prop-types'
import { SelectChildPicker } from '../../components/Parent/SelectChildPicker'
import EnvVars from '../../constants/EnviromentVars'

export default class RewardsScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      children: [],
      selectedChild: 0,
      rewards: [],
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
          this.setState({ children: JSON.parse(responseJson.response) }, this.fetchChildRewards)
        } else {

        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  fetchChildRewards = () => {
    this.props.setChildID(this.state.children[this.state.selectedChild].id)
    let url = `${EnvVars.apiUrl}routine_manager/get-reward?selectedChildID=${this.state.children[this.state.selectedChild].id}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.setState({ rewards: JSON.parse(responseJson.response).map(reward => ({ title: reward.name, ...reward })), loading: false })
        } else {

        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  deleteReward (id) {
    fetch(EnvVars.apiUrl + 'routine_manager/remove-reward/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rewardID: id,
        childID: this.state.children[this.state.selectedChild].id
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          console.log('trofeu apagada')
          this.setState({ rewards: this.state.rewards.filter(reward => reward.id !== id) })
        } else {
          console.log('trofeu nao apagado')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  onItemPress = index => {
    Alert.alert(
      `Tem a certeza que pretende apagar o prémio "${this.state.rewards[index].name}"?`,
      'Esta ação não pode ser revertida',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => this.deleteReward(this.state.rewards[index].id) }
      ],
      { cancelable: false }
    )
  }

  moveItemUp = (i) => {
    if (i === 0) return
    this.setState({ rewards: this.state.rewards.map((element, index) => {
      if (index === i - 1) return this.state.rewards[i]
      else if (index === i) return this.state.rewards[i - 1]
      else return element
    }) }, () => {
      let url = `${EnvVars.apiUrl}routine_manager/switch-reward-weight/`
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstRewardID: this.state.rewards[i].id,
          secondRewardID: this.state.rewards[i - 1].id
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

  onChildChanged = child => {
    this.setState({ selectedChild: child, loading: true }, this.fetchChildRewards)
  }

  render () {
    if (this.state.loading) return (<Content contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}><Spinner /></Content>)
    else {
      return (
        <Content>
          <SelectChildPicker hideStatus children={this.state.children} selected={this.state.selectedChild} onChildChanged={this.onChildChanged} />
          <SortableList items={this.state.rewards} onItemPress={this.onItemPress} moveItemUp={this.moveItemUp} />
        </Content>
      )
    }
  }
}

RewardsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  setChildID: PropTypes.func.isRequired,
  loggedUserEmail: PropTypes.string.isRequired
}
