import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { ChildExperienceBar } from '../ChildExperienceBar'
import { ShopItem } from '../ShopItem'
import { ShopTitle } from '../ShopTitle'

configure({ adapter: new Adapter() })

describe('MainMenu components', () => {
  it('renders ChildExperienceBar correctly', () => {
    const wrapper = shallow(<ChildExperienceBar
      progress={0.5}
      level={2} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders ShopItem correctly', () => {
    const wrapper = shallow(<ShopItem
      cost={100}
      disabled={false}
      purchased={false}
      purchaseItem={jest.fn()}
      id={0} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ disabled: true })
    wrapper.setProps({ purchased: true })
    wrapper.instance().purchaseItem()
    wrapper.unmount()
  })

  it('renders ShopTitle correctly', () => {
    const wrapper = shallow(<ShopTitle
      title={'test'} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })
})
