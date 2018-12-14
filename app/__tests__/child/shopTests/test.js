import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { ShopScreen } from '../../../screens/child/ShopScreen'

configure({ adapter: new Adapter() })

describe('ShopScreen snapshot', () => {
  it('renders ShopScreen correctly', () => {
    const wrapper = shallow(<ShopScreen
      stars={1}
      itemsOwned={[]}
      purchaseItem={jest.fn()}
      gender={'M'}
      toggleItem={jest.fn()}
      itemsEquiped={[0, 1]}
      id={0} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })
})
