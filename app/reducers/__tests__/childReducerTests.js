import childReducer from '../childReducer'
import { childTypes } from '../../actions/actionTypes'

describe('child reducer', () => {
  it('should return initial state', () => {
    expect(childReducer(undefined, {})).toEqual({
      stars: 100,
      level: 4,
      xp: 460,
      itemsOwned: []
    })
  })

  it('should add stars', () => {
    expect(
      childReducer({
        stars: 100,
        level: 4,
        xp: 460
      }, {
        type: childTypes.addStars,
        payload: 3
      }))
      .toEqual({
        stars: 103,
        level: 4,
        xp: 463
      })

    expect(
      childReducer({
        stars: 0,
        level: 4,
        xp: 499
      }, {
        type: childTypes.addStars,
        payload: 2
      }))
      .toEqual({
        stars: 2,
        level: 5,
        xp: 501
      })
  })

  it('should purchase item', () => {
    expect(
      childReducer({
        stars: 100,
        itemsOwned: []
      }, {
        type: childTypes.purchaseItem,
        payload: {
          id: 0,
          cost: 50
        }
      }))
      .toEqual({
        stars: 50,
        itemsOwned: [0]
      })
  })
})
