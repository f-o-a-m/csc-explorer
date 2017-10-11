import React, {Component} from 'react'
import MapGL, {Marker, NavigationControl} from 'react-map-gl'
import classnames from 'classnames'

const TOKEN = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA'
const POPULARITY_THRESHOLD = 0.01

const DialogMarker = ({status, title, balance, popularity}) => {

  const statusStyle = classnames({
    'active': status === 'STATUS_ACTIVE',
    'proposal': status === 'STATUS_PROPOSAL',
  })

  const showBubble = classnames({
    'showBubble': popularity < POPULARITY_THRESHOLD,
    'hideBubble': popularity > POPULARITY_THRESHOLD,
  })

  return (
    <div className={`pinContainer ${statusStyle}`}>
      <span className={`shadowS ${showBubble}`}>
        <div id={'bubble'} className={'name pr1 pl1 pv06 br1 flexAlignCenter'}>
          {title}
          <div className={'pr1'} />
          {balance}
        </div>
        <div id={'downArrow'} />
      </span>
    </div>
  )
}

const renderMapMarkers = (mapData) => {
  if (mapData.length > 0) {
    return mapData.map((datum, i) => {
      const { title, position, status, balance, hashkey, popularity } = datum
      return (
        <Marker
          key={hashkey}
          longitude={position[0]}
          latitude={position[1]}>
          <DialogMarker
            status={status}
            title={title}
            balance={balance}
            popularity={popularity}/>
        </Marker>
      )
    })
  }
}



const Map = (props) => {
  console.log(this)
  return (
    <MapGL
      {...props.viewport}
      mapStyle={'mapbox://styles/mapbox/dark-v9'}
      onViewportChange={(e) => props.actions.onViewportChange(e)}
      mapboxApiAccessToken={TOKEN}>
      {  renderMapMarkers(props.mapData) }
    </MapGL>
  )
}

export default Map
