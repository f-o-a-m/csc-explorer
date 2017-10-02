import * as types from '../constants/ActionTypes'

export const toggleCellExtrusion = bool => ({ type: types.TOGGLE_CELL_EXTRUSION, bool })
export const resizeViewport = (width, height) => ({ type: types.RESIZE_VIEWPORT, width, height})
export const onViewportChange = (newViewport) => ({type: types.ON_VIEWPORT_CHANGE, newViewport})
