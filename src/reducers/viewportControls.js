const initialState = {
    viewport: {
      altitude: 1.5,
      width: 500,
      height: 500,
      longitude: -73.990173,
      latitude: 40.726966,
      zoom: 12,
      minZoom: 1,
      maxZoom: 15,
      pitch: 40.5,
      bearing: -27.396674584323023
    },
  }

  export default function viewportControls(state = initialState, action) {
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
