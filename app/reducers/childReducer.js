import { childTypes } from '../actions/actionTypes'

const initialState = {
  stars: 300,
  level: 4,
  xp: 460,
  gender: 'F',
  itemsOwned: [],
  itemsEquiped: [],
  showLevelUpModal: true
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case childTypes.addChild:
      return { ...state, payload }
    case childTypes.addStars:
      let stars = state.stars + payload
      let xp = state.xp + payload
      let level = Math.floor(xp / 100)
      return { ...state, stars, xp, level, showLevelUpModal: level !== state.level }
    case childTypes.purchaseItem:
      return { ...state, itemsOwned: [...state.itemsOwned, payload.id], stars: state.stars - payload.cost }
    case childTypes.toggleItem:
      if (state.itemsEquiped.includes(payload)) return { ...state, itemsEquiped: state.itemsEquiped.filter(id => id !== payload) }
      else return { ...state, itemsEquiped: [...state.itemsEquiped, payload] }
    case childTypes.toggleLevelUpModal:
      return { ...state, showLevelUpModal: !state.showLevelUpModal }
    default:
      return state
  }
}
