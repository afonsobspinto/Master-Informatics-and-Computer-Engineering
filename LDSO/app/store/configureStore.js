import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer'
import ReduxThunk from 'redux-thunk'

export default function configureStore () {
  return createStore(
    rootReducer,
    applyMiddleware(ReduxThunk)
  )
}
