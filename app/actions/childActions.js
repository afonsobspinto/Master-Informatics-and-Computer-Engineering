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

export function toggleItem (id) {
  return {
    type: childTypes.toggleItem,
    payload: id
  }
}

export function toggleLevelUpModal () {
  return {
    type: childTypes.toggleLevelUpModal
  }
}
