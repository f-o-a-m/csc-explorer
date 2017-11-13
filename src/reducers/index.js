import { combineReducers } from 'redux'

const initalCardList = [
  {
    title: 'Welcome to FOAM',
    message: 'We are a protocol built to store and verify spatial addresses. Feel free to browse the map or take a look at the options below!',
    buttonText: 'Claim Your 5 FOAM tokens',
    status: "STATUS_INFO",
    type: "INFO",
    closable: true,
  },
  {
    title: 'Case Study',
    message: 'See how FOAM can help community sourced agriculture build sustainable community.',
    buttonText: 'See the Case Study',
    status: "STATUS_ACTIVE",
    type: "INFO",
    closable: true,
  },
  {
    title: 'Add A Coordinate',
    message: 'Request address verification from the network.',
    buttonText: 'Create a Cryptospastial Coordinate',
    status: "STATUS_PROPOSAL",
    type: "INFO",
    closable: true,
  },
]

const newMapItemCard = {
    title: 'Create CSC',
    status: "STATUS_INFO",
    type: "SUBMIT",
    closable: true,
  }

const UNITS = ['LATLONG', 'GEOHASH']

const initialState = {
  mapData: [],
  cardList: initalCardList,
  cellsAreExtruded: false,
  newCSC: true,
  sidebar: true,
  dash: false,
  layerTrayOpen: true,
  unitIndex: 0,
  unit: UNITS[0],
  userLocation: {
    longitude: false,
    latitude: false,
  },
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

function toggleSideBar(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return Object.assign({}, state, {
        sidebar: !state.sidebar,
      })
    default:
      return state
  }
}


function toggleDash(state = initialState, action) {
  switch (action.type){
    case 'TOGGLE_DASH':
      return Object.assign({}, state, {
        dash: !state.dash,
      })
    default:
      return state
  }
}

function toggleThroughUnits(state = initialState, action) {
  switch (action.type){
    case 'TOGGLE_THROUGH_UNITS':
      let newIndex
      if (state.unitIndex < UNITS.length - 1) {
        newIndex = state.unitIndex  + 1
      } else {
        newIndex = 0
      }
      return Object.assign({}, state, {
        unitIndex: newIndex,
        unit: UNITS[newIndex],
      })
    default:
      return state
  }
}

function cardControl(state = initialState, action) {
  switch (action.type){
    case 'GET_MAP_ITEM_INFO':
    action.info.type = "MARKER"
    return Object.assign({}, state, {
      cardList : [action.info],
    })
    case 'INIT_NEW_MAP_ITEM':
    const newCards = [newMapItemCard, ...state.cardList]
    return Object.assign({}, state, {
      cardList : newCards,
    })
    case 'REMOVE_MAP_ITEM_INFO':
    return Object.assign({}, state, {
      cardList : [
          ...state.cardList.slice(0, action.index),
          ...state.cardList.slice(action.index + 1)
      ]
    })
    default:
      return state
  }
}

function viewportControls(state = initialState, action) {
  switch (action.type) {
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
    case 'ZOOM':
      return ({
        ...state,
        viewport: {
          ...state.viewport,
          zoom: state.viewport.zoom + action.zoom,
        }
      })
    case 'SET_USER_LOCATION':
      return Object.assign({}, state, {
        userLocation : action.location,
    })
    case 'GO_TO_USER_LOCATION':
      if (state.userLocation.longitude && state.userLocation.latitude) {
        return ({
          ...state,
          viewport: {
            ...state.viewport,
            latitude: state.userLocation.latitude,
            longitude: state.userLocation.longitude,
          }
        })
      }
    default:
      return state
  }
}

function layerControl(state = initialState, action) {
  switch (action.type){
    case 'TOGGLE_LAYER_TRAY':
    return Object.assign({}, state, {
      layerTrayOpen: !state.layerTrayOpen, //replaces the list
    })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  mapControls,
  viewportControls,
  cardControl,
  setMapData,
  toggleSideBar,
  toggleDash,
  toggleThroughUnits,
  layerControl,
})

export default rootReducer
