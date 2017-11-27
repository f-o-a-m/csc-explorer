// Viewport Events
export const resizeViewport = (width, height) => ({ type: 'RESIZE_VIEWPORT', width, height})
export const onViewportChange = (newViewport) => ({type: 'ON_VIEWPORT_CHANGE', newViewport})

// Map Interaction
export const getMapItemInfo = info => ({type: 'GET_MAP_ITEM_INFO', info})
export const removeMapItemInfo = (index) => ({type: 'REMOVE_MAP_ITEM_INFO', index})
export const initNewMapItem = bool => ({type: 'INIT_NEW_MAP_ITEM', bool})
export const setMapData = (mapData) => ({type: 'SET_MAP_DATA', mapData})
export const toggleCellExtrusion = bool => ({ type: 'TOGGLE_CELL_EXTRUSION', bool })

// Sidebar
export const toggleSidebar = bool => ({ type: 'TOGGLE_SIDEBAR', bool })
export const closeSidebar = () => ({ type: 'CLOSE_SIDEBAR' })
export const openSidebar = () => ({ type: 'OPEN_SIDEBAR' })

// Dash
export const toggleDash = bool => ({ type: 'TOGGLE_DASH', bool })

// Map Controls
export const toggleThroughUnits = () => ({ type: 'TOGGLE_THROUGH_UNITS' })
export const goToUserLocation = () => ({ type: 'GO_TO_USER_LOCATION' })
export const zoom = zoom => ({ type: 'ZOOM', zoom})

// Layer Control
export const toggleLayerTray = () => ({ type: 'TOGGLE_LAYER_TRAY' })
export const toggleLayer = (key, zoom) => ({ type: 'TOGGLE_LAYER', key, zoom })
export const openLayer = key => ({ type: 'OPEN_LAYER', key })
export const closeLayer = key => ({ type: 'CLOSE_LAYER', key })
export const evalLayers = (zoom) => ({ type: 'EVAL_LAYERS', zoom })

//Misc
export const setUserLocation = (location) => ({type: 'SET_USER_LOCATION', location})
export const geolocationApproval = () => ({type: 'GEOLOCATION_APPROVAL'})
export const geolocationRejection = () => ({type: 'GEOLOCATION_REJECTION'})
