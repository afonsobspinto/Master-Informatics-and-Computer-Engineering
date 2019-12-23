import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { routines, activityWithURI } from '../../../constants/mockTestData'
import { getCardStyle } from '../../../styles/CardCarousel.style'

import Card from '../Card'
import CardButton from '../CardButton'
import CardCarousel from '../CardCarousel'

configure({ adapter: new Adapter() })

describe('Carousel components', () => {
  it('renders Card correctly', () => {
    const wrapper = shallow(<Card
      onPress={jest.fn()}
      onButtonPress={jest.fn()}
      item={routines[0]}
      isRoutine={false} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().onPress()
    wrapper.instance().onButtonPress()
    wrapper.setProps({ item: activityWithURI })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders CardButton correctly', () => {
    const cardStyle = getCardStyle('#fff')
    const wrapper = shallow(<CardButton
      cardStyle={cardStyle}
      onPress={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders CardCarousel correctly', () => {
    const wrapper = shallow(<CardCarousel
      onPress={jest.fn()}
      isRoutine
      onButtonPress={jest.fn()}
      data={routines} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().renderCard({ item: routines[0] })
    wrapper.unmount()
  })
})
