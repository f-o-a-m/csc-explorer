import { combineReducers } from 'redux'

const initialState = {
    info: {},
    cellsAreExtruded: false,
    viewport: {
      altitude: 1.5,
      width: 500,
      height: 500,
      longitude: -73.990173,
      latitude: 40.726966,
      zoom: 12,
      minZoom: 1,
      maxZoom: 30,
      pitch: 40.5,
      bearing: -27.396674584323023
    },
  }

function mapControls(state = initialState, action) {
  switch (action.type){
    case 'TOGGLE_CELL_EXTRUSION':
      return {
        cellsAreExtruded: !state.cellsAreExtruded,
      }
    default:
      return state
  }
}

function getMapsItemInfo(state = initialState, action) {
  switch (action.type){
    case 'GET_MAP_ITEM_INFO':
      return {
        info: action.info,
      }
    default:
      return state
  }
}

function viewportControls(state = initialState, action) {
  switch (action.type){
    case 'RESIZE_VIEWPORT':
      return {
        viewport : {
          ...state.viewport,
          width: action.width,
          height: action.height,
        },
      }
    case 'ON_VIEWPORT_CHANGE':
      return {
        // this could be more immutable
        viewport : action.newViewport,
      }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  mapControls,
  viewportControls,
  getMapsItemInfo,
})

export default rootReducer
