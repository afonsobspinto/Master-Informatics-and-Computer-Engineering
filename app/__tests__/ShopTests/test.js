import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { ShopScreen } from '../../screens/ShopScreen'

describe('ShopScreen snapshot', () => {
  it('renders ShopScreen correctly', async () => {
    const tree = renderer.create(<ShopScreen
      stars={1}
      itemsOwned={[]}
      purchaseItem={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
