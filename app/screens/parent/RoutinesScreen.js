import React from 'react'
import { Content, Spinner } from 'native-base'
import { SortableList } from '../../components/Parent/SortableList'
import { PropTypes } from 'prop-types'

export class RoutinesScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      routines: routines,
      loading: false
    }
  }

  onRoutinePress = (index) => {
    this.props.navigation.navigate('RoutineFormScreen', { routine: routines[index] })
  }

  render () {
    if (this.state.loading) return (<Content contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}><Spinner /></Content>)
    else {
      return (
        <Content>
          <SortableList items={this.state.routines} onItemPress={this.onRoutinePress} />
        </Content>
      )
    }
  }
}

RoutinesScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

const routines = [
  {
    title: 'Após acordar',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Magnificent_CME_Erupts_on_the_Sun_-_August_31.jpg',
    color: '#37c1f0',
    periodicity: [ 0, 1, 2, 3, 4 ],
    isRepeat: true,
    activities: [
      {
        title: 'Fazer a cama',
        photo: 'https://hniesfp.imgix.net/8/images/detailed/14/EA1A7075.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format,compress',
        color: '#7d84b2',
        time: {
          min: 0,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Lavar os dentes',
        image: 'toothbrush',
        color: '#0e79b2',
        time: {
          min: 1,
          max: 15,
          goal: 10
        }
      },
      {
        title: 'Vestir',
        image: 'socks',
        color: '#7fb800',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Tomar banho',
        image: 'shower',
        color: '#37c1f0',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Preparar a mochila',
        image: 'bag',
        color: '#e43f6f',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Calçar os sapatos',
        image: 'sneakers',
        color: '#4bb3fd',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Tomar o pequeno almoço',
        image: 'breakfast',
        color: '#ff7f11',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Pentear cabelo',
        image: 'comb',
        color: '#b0db43',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      }
    ]
  },
  {
    title: 'Antes de dormir',
    image: 'moon',
    color: '#011f39',
    periodicity: [ 0, 1, 2, 3, 4, 5, 6 ],
    isRepeat: true,
    activities: [
      {
        title: 'Ajudar na cozinha',
        image: 'fork',
        color: '#1a5e63',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Arrumar o quarto',
        image: 'drawers',
        color: '#a3320b',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Fazer os trabalhos para casa',
        image: 'paper',
        color: '#657153',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Arrumar os brinquedos',
        image: 'blocks',
        color: '#519e8a',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Ler um livro',
        image: 'book',
        color: '#ff9f1c',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      },
      {
        title: 'Preparar a roupa do dia seguinte',
        image: 'shirt',
        color: '#ff9f1c',
        time: {
          min: 10,
          max: 120,
          goal: 60
        }
      }
    ]
  }
]
