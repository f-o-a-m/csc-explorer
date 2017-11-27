import React from 'react'
import ngeohash from 'ngeohash'
import classnames from 'classnames'

const MapControls = (props) => {

  const swapUnits = () => {
    switch (props.unit) {
      case 'LATLONG':
        let lat = props.viewport.latitude.toFixed(2)
        let long = props.viewport.longitude.toFixed(2)
        return `${lat}, ${long}`
      case 'GEOHASH':
        let gh = ngeohash.encode(props.viewport.latitude, props.viewport.longitude)
        return `${gh}`
    }
  }

  const geolocationStyle = classnames({
    'blue-text': props.geolocation,
    'red-text': !props.geolocation,
  })

  return (
    <footer id={'mapControlsContainer'}>
      <button className={'button-location'} onClick={() => props.actions.toggleThroughUnits()}>{swapUnits()}</button>
      <button className={'button-zoomIn'} onClick={() => props.actions.zoom(0.5)}>{'+'}</button>
      <button className={'button-zoomOut'} onClick={() => props.actions.zoom(-0.5)}>{'-'}</button>
      <button className={`button-zenith ${geolocationStyle}`} onClick={() => props.actions.goToUserLocation()}>{'⦿'}</button>
    </footer>
  )
}

export default MapControls
