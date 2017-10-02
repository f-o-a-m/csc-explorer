const initialState = {
    cellsAreExtruded: false,
  }

export default function mapControls(state = initialState, action) {
  switch (action.type){
    case 'TOGGLE_CELL_EXTRUSION':
      return {
        cellsAreExtruded: !state.cellsAreExtruded,
      }
    default:
      return state
  }
}
