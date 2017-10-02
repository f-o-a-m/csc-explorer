import React, {Component} from 'react'
import MapGL, {Popup} from 'react-map-gl'
import { connect } from 'react-redux'

import DeckGLOverlay from './DeckGLOverlay.js'

import { resizeViewport, onViewportChange } from '../actions'

import dataPoints from '../data/data.json'


// Set your mapbox token here
// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN // eslint-disable-line

const token = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      coordinates: [-0.13235092163085938,51.518250335096376],
      info: "Hello",
    }

  }

  componentWillMount(){
    this.setState({data: dataPoints})
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this))
    this._resize()
  }

  _resize() {
    this.props.dispatch(resizeViewport(window.innerWidth,window.innerHeight))
  }

  _onViewportChange(viewport) {
    this.props.dispatch(onViewportChange(viewport))
  }

  _setName = (info) => {
    if(info){
      this.setState({info: info.object.name, coordinates: info.lngLat})
    }
  }

  _onHover = (info) => {
    // console.log(info)
  }

  _onClick = (info) => {
    console.log(info)
    if(info){
      this.setState({info: info.object.name + info.index, coordinates: info.lngLat})
    }
  }

  render() {
    const {data} = this.state
    return (
      <MapGL
        {...this.props.viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={token}>
        <Popup
          // onClick={}
          longitude={this.state.coordinates[0]}
          latitude={this.state.coordinates[1]}>
          <div>{this.state.info}</div>
        </Popup>
        <DeckGLOverlay
          viewport={this.props.viewport}
          data={data || []}
          cellsAreExtruded={this.props.cellsAreExtruded}
          onHover={this._onHover}
          onClick={this._onClick}
          callbackFromParent={this._renderPopup}
        />
      </MapGL>
    )
  }
}
export default connect(
  resizeViewport,
  onViewportChange,
)(Map)
