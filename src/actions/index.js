export const toggleCellExtrusion = bool => ({ type: 'TOGGLE_CELL_EXTRUSION', bool })
export const resizeViewport = (width, height) => ({ type: 'RESIZE_VIEWPORT', width, height})
export const onViewportChange = (newViewport) => ({type: 'ON_VIEWPORT_CHANGE', newViewport})
export const getMapsItemInfo = (info) => ({type: 'GET_MAP_ITEM_INFO', info})
export const removeMapsItemInfo = (index) => ({type: 'REMOVE_MAP_ITEM_INFO', index})
export const newMapsItem = bool => ({type: 'NEW_MAP_ITEM', bool})
export const setMapData = (mapData) => ({type: 'SET_MAP_DATA', mapData})

export const toggleSidebar = bool => ({ type: 'TOGGLE_SIDEBAR', bool })
