import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import { ChooseActivityScreen } from '../../screens/ChooseActivityScreen'

configure({ adapter: new Adapter() })

describe('ChooseActivityScreen snapshot', () => {
  const activities = [
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

  it('renders ChooseActivityScreen correctly', () => {
    const wrapper = shallow(<ChooseActivityScreen
      navigation={{}}
      activities={activities}
      setCurrentActivity={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })
})
