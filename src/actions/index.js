export const toggleCellExtrusion = bool => ({ type: 'TOGGLE_CELL_EXTRUSION', bool })
export const resizeViewport = (width, height) => ({ type: 'RESIZE_VIEWPORT', width, height})
export const onViewportChange = (newViewport) => ({type: 'ON_VIEWPORT_CHANGE', newViewport})
export const getMapsItemInfo = (info) => ({type: 'GET_MAP_ITEM_INFO', info})
