import { childTypes } from '../actionTypes'
import * as childActions from '../childActions'

describe('child actions', () => {
  it('should create an action to add stars', () => {
    const params = 4
    const expectedAction = {
      type: childTypes.addStars,
      payload: 4
    }
    expect(childActions.addStars(params)).toEqual(expectedAction)
  })

  it('should create an action to purchase item', () => {
    const params = [100, 8]
    const expectedAction = {
      type: childTypes.purchaseItem,
      payload: {
        cost: 100,
        id: 8
      }
    }
    expect(childActions.purchaseItem(...params)).toEqual(expectedAction)
  })
})
