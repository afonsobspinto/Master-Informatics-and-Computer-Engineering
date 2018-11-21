import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { ChooseRoutineScreen } from '../../screens/ChooseRoutineScreen'

configure({ adapter: new Adapter() })

describe('ChooseActivityScreen snapshot', () => {
  const routines = [
    {
      title: 'Após acordar',
      image: 'sun',
      color: '#37c1f0',
      activities: [
        {
          title: 'Fazer a cama',
          image: 'bed',
          photo: 'bedroom',
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
      photo: 'night',
      color: '#011f39',
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

  it('renders ChooseActivityScreen correctly', () => {
    const wrapper = shallow(<ChooseRoutineScreen
      navigation={{ navigate: jest.fn() }}
      routinePlayType={'auto'}
      routines={routines}
      setCurrentRoutine={jest.fn()}
      nextActivity={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().chooseActivities()
    wrapper.instance().startRoutine()
    wrapper.setProps({ routinePlayType: 'choose' })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ routines: [] })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })
})
