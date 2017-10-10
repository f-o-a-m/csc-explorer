import React, {Component} from 'react'
import MapGL, {Marker} from 'react-map-gl'
import { connect } from 'react-redux'
import DeckGLOverlay from './DeckGLOverlay.js'
import dataPoints from '../data/data.json'


const token = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA'

const DialogMarker = ({status, name, balance}) => {
  let statusStyle
  switch (status) {
    case 'STATUS_ACTIVE': statusStyle = 'active'
      break
    case 'STATUS_PROPOSAL': statusStyle = 'proposal'
      break
    default: statusStyle = 'inactive'
  }
  return (
    <div className={`pinContainer ${statusStyle}`}>
      <span>
        <div className={'name pr pl pv brl'}>{name}</div>
        <div className={'balance pl pr pv brr bg-w'}>{balance}</div>
        <div id={'downArrow'} />
      </span>
    </div>
  )
}

export default class Map extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.props.actions.resizeViewport(window.innerWidth, window.innerHeight))
  }

  _renderMarker(location, i) {
  const { name, position, status, balance } = location
  return (
    <Marker key={i} longitude={position[0]} latitude={position[1]}>
      <DialogMarker status={status} name={name} balance={balance}/>
    </Marker>
  )
}


  render() {
    return (
      <MapGL
        {...this.props.viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={(e) => this.props.actions.onViewportChange(e)}
        mapboxApiAccessToken={token}>
      { dataPoints.map(this._renderMarker) }
      </MapGL>
    )
  }
}
