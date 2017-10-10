import React, {Component} from 'react'
import MapGL, {Marker} from 'react-map-gl'
import { connect } from 'react-redux'
import './Markers.css'
import DeckGLOverlay from './DeckGLOverlay.js'
import dataPoints from '../data/data.json'


const token = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA'

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }

  componentWillMount() {
    this.setState({data: dataPoints})
  }

  componentDidMount() {
    window.addEventListener('resize', this.props.actions.resizeViewport(window.innerWidth,window.innerHeight))

  }

  _renderMarker(location, i) {
  const {name, position} = location;
  return (
    <Marker key={i} longitude={position[0]} latitude={position[1]} >
      <div className="location"><span>{name}</span></div>
    </Marker>
  );
}


  render() {
    const {data} = this.state
    return (
      <MapGL
        {...this.props.viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={(e) => this.props.actions.onViewportChange(e)}
        mapboxApiAccessToken={token}
        data={data || []}>
      { dataPoints.map(this._renderMarker) }
      </MapGL>
    )
  }
}
