import { combineReducers } from 'redux'

const cards = [
  {
    title: 'Welcome to FOAM',
    message: 'We are a protocol built to store and verify spatial addresses. Feel free to browse the map or take a look at the options below!',
    buttonText: 'Claim Your 5 FOAM tokens',
    // color: '#242424', //eventually we'll just have a messageType key that handles this with css class
    // buttonColor: '#333333',
    status: "STATUS_INFO",
    type: "INFO",
  },
  {
    title: '',
    message: 'See how FOAM can help community sourced agriculture build sustainable community.',
    buttonText: 'See the Case Study',
    // color: '#27AE60',
    // buttonColor: '#51CB84',
    status: "STATUS_ACTIVE",
    type: "INFO",
  },
  {
    title: '',
    message: 'Request address verification from the network.',
    buttonText: 'Create a Cryptospastial Coordinate',
    // color: '#2F80ED',
    // buttonColor: '#63A4FC',
    status: "STATUS_PROPOSAL",
    type: "INFO",
  },
]

const initialState = {
  mapData: [],
  info: cards,
  cellsAreExtruded: false,
  newCSC: true,
  viewport: {
    altitude: 1.5,
    width: 500,
    height: 500,
    longitude: -73.990173,
    latitude: 40.726966,
    zoom: 12,
    minZoom: 1,
    maxZoom: 17,
    pitch: 40.5,
    bearing: -27.396674584323023
  },
}

function setMapData(state = initialState, action) {
  switch (action.type){
    case 'SET_MAP_DATA':
      return Object.assign({}, state, {
        mapData: action.mapData,
      })
    default:
      return state
  }
}

function mapControls(state = initialState, action) {
  switch (action.type){
    case 'TOGGLE_CELL_EXTRUSION':
      return Object.assign({}, state, {
        cellsAreExtruded: !state.cellsAreExtruded,
      })
    default:
      return state
  }
}

// What's the data type when getting new info from the API?
function getMapsItemInfo(state = initialState, action) {
  switch (action.type){
    case 'GET_MAP_ITEM_INFO':
    action.info.type = "MARKER"
    return Object.assign({}, state, {
      // info :[action.info, ...state.info], //adds to the list
      info : [action.info], //replaces the list
    })
    case 'REMOVE_MAP_ITEM_INFO':
    return Object.assign({}, state, {
      info : [
          ...state.info.slice(0, action.index),
          ...state.info.slice(action.index + 1)
      ]
    })
    default:
      return state
  }
}

// What's the data type when getting new info from the API?
function makeNewCSC(state = initialState, action) {
  switch (action.type){
    case 'NEW_MAP_ITEM':
    return Object.assign({}, state, {
      // info :[action.info, ...state.info], //adds to the list
      newCSC : !state.newCSC, //replaces the list
    })
    default:
      return state
  }
}

function viewportControls(state = initialState, action) {
  switch (action.type){
    case 'RESIZE_VIEWPORT':
      return ({
        ...state,
        viewport: {
          ...state.viewport,
          width: action.width,
          height: action.height,
        }
      })
    case 'ON_VIEWPORT_CHANGE':
      return Object.assign({}, state, {
        viewport : action.newViewport,
      })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  mapControls,
  viewportControls,
  getMapsItemInfo,
  setMapData,
  makeNewCSC,
})

export default rootReducer
