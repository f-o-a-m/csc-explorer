import React, {Component} from 'react'
import MapGL, {Popup} from 'react-map-gl'
import { connect } from 'react-redux'

import DeckGLOverlay from './DeckGLOverlay.js'

// import { resizeViewport, onViewportChange } from '../actions'

import dataPoints from '../data/data.json'


// Set your mapbox token here
// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN // eslint-disable-line

const token = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA'

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }

  componentWillMount(){
    this.setState({data: dataPoints})
  }

  componentDidMount() {
    window.addEventListener('resize', this.props.actions.resizeViewport(window.innerWidth,window.innerHeight))

  }


  render() {
    const {data} = this.state
    return (
      <MapGL
        {...this.props.viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={(e) => this.props.actions.onViewportChange(e)}
        mapboxApiAccessToken={token}>
        <Popup
          // onClick={}
          longitude={this.props.viewport.longitude}
          latitude={this.props.viewport.latitude}>
          <div>{this.props.info.hasOwnProperty('object') ? this.props.info.object.name : ''}</div>
        </Popup>
        <DeckGLOverlay
          dispatch={this.props.dispatch}
          viewport={this.props.viewport}
          data={data || []}
          cellsAreExtruded={this.props.cellsAreExtruded}
          onHover={this._onHover}
          callbackFromParent={this._renderPopup}
        />
      </MapGL>
    )
  }
}
// export default connect(
//   resizeViewport,
//   onViewportChange,
// )(Map)
