import { combineReducers } from 'redux'
import settings from './settingsReducer'
import game from './gameReducer'
import child from './childReducer'
import user from './userReducer'

const rootReducer = combineReducers({
  settings,
  game,
  child,
  user
})

export default rootReducer
