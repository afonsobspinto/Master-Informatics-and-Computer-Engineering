import { childTypes } from './actionTypes'

export function addStars (stars) {
  return {
    type: childTypes.addStars,
    payload: stars
  }
}

export function purchaseItem (cost, id) {
  return {
    type: childTypes.purchaseItem,
    payload: { cost, id }
  }
}
