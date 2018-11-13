import { childTypes } from '../actions/actionTypes'

const initialState = {
  stars: 100,
  level: 4,
  xp: 460,
  itemsOwned: []
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case childTypes.addStars:
      let stars = state.stars + payload
      let xp = state.xp + payload
      let level = Math.floor(xp / 100)
      return { ...state, stars, xp, level }
    case childTypes.purchaseItem:
      return { ...state, itemsOwned: [...state.itemsOwned, payload.id], stars: state.stars - payload.cost }
    default:
      return state
  }
}
