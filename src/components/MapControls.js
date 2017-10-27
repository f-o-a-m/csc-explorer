import React from 'react'

const MapControls = (props) => {
  return (
    <footer id={'mapControlsContainer'}>
      <button className={'button-zoomIn'}>{'+'}</button>
      <button className={'button-zoomOut'}>{'-'}</button>
      <button className={'button-azimuth'}>{'⦿'}</button>
    </footer>
  )
}

export default MapControls
