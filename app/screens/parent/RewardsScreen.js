import React from 'react'
import { Content } from 'native-base'
import { SortableList } from '../../components/Parent/SortableList'

export default class RewardsScreen extends React.Component {
  render () {
    return (
      <Content>
        <SortableList items={rewards} onItemPress={null} />
      </Content>
    )
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
