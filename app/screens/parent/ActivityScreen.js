import React from 'react'
import { Content } from 'native-base'
import { InvalidateList } from '../../components/Parent/InvalidateList'
import { SelectChildPicker } from '../../components/Parent/SelectChildPicker'

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

const kids = [
  { name: 'Bart', image: 'https://davidkallin.files.wordpress.com/2010/11/bart-simpson.jpg' },
  { name: 'Lisa', image: 'https://66.media.tumblr.com/aa10720452d4eb5f7999144ba6a82b83/tumblr_nczlkjyQSn1sauer5o6_250.png' },
  { name: 'Maggie', image: 'https://img.maximummedia.ie/joe_co_uk/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lY291ay5tYXhpbXVtbWVkaWEuaWUuczMuYW1hem9uYXdzLmNvbVxcXC93cC1jb250ZW50XFxcL3VwbG9hZHNcXFwvMjAxN1xcXC8xMlxcXC8xNDIwMjcxNVxcXC9tYWdnaWUtc2ltcHNvbi5wbmdcIixcIndpZHRoXCI6NzY3LFwiaGVpZ2h0XCI6NDMxLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuam9lLmNvLnVrXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvam9lY291a1xcXC9uby1pbWFnZS5wbmc_dj01XCJ9IiwiaGFzaCI6ImZmNmY2NWYxYjRjYjQyYTVjMWQ5ZGUxNGI1MGUxMmEyYjJlZjcwYjQifQ==/maggie-simpson.png' }
]

export class ActivityScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      children: kids,
      activities: activities,
      selectedChild: 0
    }
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
