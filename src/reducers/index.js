import { combineReducers } from 'redux'
import mapControls from './mapControls'
import viewportControls from './viewportControls'


const rootReducer = combineReducers({
  mapControls,
  viewportControls
})

export default rootReducer
