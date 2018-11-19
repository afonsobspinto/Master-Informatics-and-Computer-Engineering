import { combineReducers } from 'redux'
import settings from './settingsReducer'
import game from './gameReducer'
import child from './childReducer'

const rootReducer = combineReducers({
  settings,
  game,
  child
})

export default rootReducer
