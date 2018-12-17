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

  it('should create an action to toggle level up modal', () => {
    const expectedAction = {
      type: childTypes.toggleLevelUpModal
    }
    expect(childActions.toggleLevelUpModal()).toEqual(expectedAction)
  })

  it('should create an action to toggle an item', () => {
    const expectedAction = {
      type: childTypes.toggleItem,
      payload: 1
    }
    expect(childActions.toggleItem(1)).toEqual(expectedAction)
  })

  it('should create an action to add a child', () => {
    const param = 'Name'
    const expectedAction = {
      type: childTypes.addChild,
      payload: 'Name'
    }
    expect(childActions.addChild(param)).toEqual(expectedAction)
  })
})
