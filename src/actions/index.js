export const toggleCellExtrusion = bool => ({ type: 'TOGGLE_CELL_EXTRUSION', bool })
export const resizeViewport = (width, height) => ({ type: 'RESIZE_VIEWPORT', width, height})
export const zoom = zoom => ({ type: 'ZOOM', zoom})
export const goToUserLocation = () => ({ type: 'GO_TO_USER_LOCATION' })
export const onViewportChange = (newViewport) => ({type: 'ON_VIEWPORT_CHANGE', newViewport})

export const getMapItemInfo = info => ({type: 'GET_MAP_ITEM_INFO', info})
export const removeMapItemInfo = (index) => ({type: 'REMOVE_MAP_ITEM_INFO', index})
export const initNewMapItem = bool => ({type: 'INIT_NEW_MAP_ITEM', bool})
export const setMapData = (mapData) => ({type: 'SET_MAP_DATA', mapData})

export const setUserLocation = (location) => ({type: 'SET_USER_LOCATION', location})

export const toggleSidebar = bool => ({ type: 'TOGGLE_SIDEBAR', bool })
export const toggleDash = bool => ({ type: 'TOGGLE_DASH', bool })
export const toggleThroughUnits = () => ({ type: 'TOGGLE_THROUGH_UNITS' })
export const toggleLayerTray = () => ({ type: 'TOGGLE_LAYER_TRAY' })
