import { combineReducers } from 'redux'

const initalCardList = [
  {
    title: 'Welcome to FOAM',
    message: 'We are a protocol built to store and verify spatial addresses. Feel free to browse the map or take a look at the options below!',
    status: "STATUS_INFO",
    type: "INFO",
    closable: true,
  },
  {
    title: 'FOAM API',
    message: 'You can create spatial blockchain queries using our API.',
    status: "STATUS_ACTIVE",
    type: "INFO",
    closable: true,
  }
]

const newMapItemCard = {
    title: 'Create CSC',
    status: "STATUS_INFO",
    type: "SUBMIT",
    closable: true,
  }

const layers = [
  {
    title: 'CSCs',
    key: 'CSC',
    state: 'ON',
    upperLimit: 14,
    lowerLimit: 2,
    controls: false,
    controlsOpen: false,
  }
]

const UNITS = ['LATLONG', 'GEOHASH']

const initialState = {
  mapData: [],
  cardList: initalCardList,
  cellsAreExtruded: false,
  newCSC: true,
  sidebar: true,
  dash: false,
  layerTrayOpen: false,
  unitIndex: 0,
  unit: UNITS[0],
  geolocation: false,
  userLocation: {
    longitude: false,
    latitude: false,
  },
  layers,
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
    case 'OPEN_SIDEBAR':
      return Object.assign({}, state, {
        sidebar: true,
      })
    case 'CLOSE_SIDEBAR':
      return Object.assign({}, state, {
        sidebar: false,
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
        geolocation: true,
    })
    case 'GEOLOCATION_REJECTION':
      return Object.assign({}, state, {
        geolocation: false,
      })
    case 'GEOLOCATION_APPROVAL':
    return Object.assign({}, state, {
      geolocation: true,
    })
    case 'GO_TO_USER_LOCATION':
      if (state.geolocation) {
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
      }
    case 'GO_TO_LOCATION':
      return ({
        ...state,
        viewport: {
          ...state.viewport,
          latitude: action.position[1],
          longitude: action.position[0],
          zoom: 15
        }
      })
      return state
    default:
      return state
  }
}

function layerControl(state = initialState, action) {
  switch (action.type){
    case 'TOGGLE_LAYER_TRAY':
    return Object.assign({}, state, {
      layerTrayOpen: !state.layerTrayOpen,
    })
    case 'TOGGLE_LAYER':
      return {
        ...state,
        layers: state.layers.map(layer => {
          if (layer.key === action.key) {
            return Object.assign({}, layer, { state: layerToggle(layer, action.zoom) } )
          }
          return layer
        })
      }
    case 'OPEN_LAYER':
      return {
        ...state,
        layers: state.layers.map(layer => layer.key === action.key ?
          { ...layer, state: layerOn(layer, action.zoom) } :
          layer
        )
      }
    case 'CLOSE_LAYER':
      return {
        ...state,
        layers: state.layers.map(layer => layer.key === action.key ?
          { ...layer, state: 'OFF' } :
          layer
        )
      }
    case 'EVAL_LAYERS':
      return {
        ...state,
        layers: state.layers.map(layer => {
          return {...layer, state: evalLayer(layer, action.zoom)}
        })
      }
    case 'TOGGLE_LAYER_DIALOG':
      return {
        ...state,
        layers: state.layers.map(layer => {
          if (layer.key === action.key) {
            return Object.assign({}, layer, { controlsOpen: !layer.controlsOpen } )
          }
          return layer
        })
      }
    case 'OPEN_LAYER_DIALOG':
      return {
        ...state,
        layers: state.layers.map(layer => layer.key === action.key ?
          { ...layer, controlsOpen: true } :
          layer
        )
      }
    case 'CLOSE_LAYER_DIALOG':
      return {
        ...state,
        layers: state.layers.map(layer => layer.key === action.key ?
          { ...layer, controlsOpen: false } :
          layer
        )
      }
    default:
      return state
  }
}

function layerOn(layer, zoom) {
  if (layer.upperLimit > zoom && layer.lowerLimit < zoom)  {
    return 'ON'
  }
  return 'HIDDEN'
}

function layerOff() {
  return 'OFF'
}

function layerToggle(layer, zoom) {
  if (layer.state === 'ON' || layer.state === 'HIDDEN') {
    return layerOff()
  }
  return layerOn(layer, zoom)
}

function evalLayer(layer, zoom) {
  if (layer.state === 'ON' || layer.state === 'HIDDEN') {
    return layerOn(layer, zoom)
  }
  return 'OFF'
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
