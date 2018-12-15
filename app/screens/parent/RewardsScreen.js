import React from 'react'
import { Content, Spinner } from 'native-base'
import { SortableList } from '../../components/Parent/SortableList'

export default class RewardsScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      rewards: rewards,
      loading: false
    }
  }

  render () {
    if (this.state.loading) return (<Content contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}><Spinner /></Content>)
    else {
      return (
        <Content>
          <SortableList items={this.state.rewards} onItemPress={() => {}} />
        </Content>
      )
    }
  }
}

const rewards = [
  {
    title: 'Ir à piscina',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Magnificent_CME_Erupts_on_the_Sun_-_August_31.jpg'
  },
  {
    title: 'Brincar com Legos',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Magnificent_CME_Erupts_on_the_Sun_-_August_31.jpg'
  },
  {
    title: 'Jogar PlayStation',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Magnificent_CME_Erupts_on_the_Sun_-_August_31.jpg'
  }
]
