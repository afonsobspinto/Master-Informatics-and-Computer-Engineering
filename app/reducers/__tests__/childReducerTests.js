import childReducer from '../childReducer'
import { childTypes } from '../../actions/actionTypes'

describe('child reducer', () => {
  it('should return initial state', () => {
    expect(childReducer(undefined, {})).toEqual({
      itemsOwned: [],
      itemsEquiped: [],
      showLevelUpModal: false
    })
  })

  it('should add stars', () => {
    expect(
      childReducer({
        stars: 100,
        level: 4,
        xp: 460,
        showLevelUpModal: false
      }, {
        type: childTypes.addStars,
        payload: 3
      }))
      .toEqual({
        stars: 103,
        level: 4,
        xp: 463,
        showLevelUpModal: false
      })

    expect(
      childReducer({
        stars: 0,
        level: 4,
        xp: 499,
        showLevelUpModal: false
      }, {
        type: childTypes.addStars,
        payload: 2
      }))
      .toEqual({
        stars: 2,
        level: 5,
        xp: 501,
        showLevelUpModal: true
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

  it('should toggle level up modal', () => {
    expect(
      childReducer({
        showLevelUpModal: true
      }, {
        type: childTypes.toggleLevelUpModal
      }))
      .toEqual({
        showLevelUpModal: false
      })

    expect(
      childReducer({
        showLevelUpModal: false
      }, {
        type: childTypes.toggleLevelUpModal
      }))
      .toEqual({
        showLevelUpModal: true
      })
  })

  it('should toggle equiped item', () => {
    expect(
      childReducer({
        itemsEquiped: [1]
      }, {
        type: childTypes.toggleItem,
        payload: 1
      }))
      .toEqual({
        itemsEquiped: []
      })

    expect(
      childReducer({
        itemsEquiped: [2]
      }, {
        type: childTypes.toggleItem,
        payload: 3
      }))
      .toEqual({
        itemsEquiped: [2, 3]
      })
  })

  it('should add child w/ existing avatar', () => {
    childReducer({
      itemsOwned: [],
      itemsEquiped: [],
      showLevelUpModal: false
    }, {
      type: childTypes.addChild,
      payload: {/* eslint-disable */
        "avatar": "{\"itemsOwned\":[3,8],\"itemsEquiped\":[3,8]}",
        "gender": "M",
        "id": 28,
        "image": "http://10.0.0.11:8000/static/assets/images/3owvgls19w.jpg",
        "level": 0,
        "name": "Child 1",
        "stars": 50,
        "xp": 24,
      }
      /* eslint-enable */
    })
    childReducer({
      itemsOwned: [],
      itemsEquiped: [],
      showLevelUpModal: false
    }, {
      type: childTypes.addChild,
      payload: {/* eslint-disable */
        "avatar": null,
        "gender": "M",
        "id": 28,
        "image": "http://10.0.0.11:8000/static/assets/images/3owvgls19w.jpg",
        "level": 0,
        "name": "Child 1",
        "stars": 50,
        "xp": 24,
      }
      /* eslint-enable */
    })
  })
})
