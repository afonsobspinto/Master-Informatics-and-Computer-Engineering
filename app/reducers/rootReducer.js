import { combineReducers } from 'redux'
import settings from './settingsReducer'
import game from './gameReducer'

const rootReducer = combineReducers({
  settings,
  game
})

export default rootReducer
