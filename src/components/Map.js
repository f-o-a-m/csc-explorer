import React, {Component} from 'react'
import MapGL, {Marker, NavigationControl} from 'react-map-gl'
import DeckGLOverlay from './DeckGLOverlay'

const token = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA'

const DialogMarker = ({status, title, balance}) => {
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
      <span className={'shadowS'}>
        <div className={'name pr1 pl1 pv06 brl1 flexAlignCenter'}>{title}</div>
        <div className={'balance pl1 pr1 pv06 brr1 bg-w flexAlignCenter'}>
          {balance}
          <img className={'ftimg'} src={'/foam_token.png'} />
        </div>
        <div id={'downArrow'} />
      </span>
    </div>
  )
}

const _renderMarker = (datum, i) => {
  const { title, position, status, balance } = datum
  return (
    <Marker key={i} longitude={position[0]} latitude={position[1]}>
      <DialogMarker status={status} title={title} balance={balance}/>
    </Marker>
  )
}

const Map = (props) => {
  return (
    <MapGL
      {...props.viewport}
      mapStyle={'mapbox://styles/mapbox/dark-v9'}
      onViewportChange={(e) => props.actions.onViewportChange(e)}
      mapboxApiAccessToken={token}>
      { props.mapData.length > 0 ? props.mapData.map((datum, i) => { return _renderMarker(datum, i)}) : null }
    </MapGL>
  )
}

export default Map
