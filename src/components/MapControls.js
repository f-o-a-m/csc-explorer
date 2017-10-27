import React from 'react'

const MapControls = (props) => {
  return (
    <footer id={'mapControlsContainer'}>
      <button className={'button-zoomIn'}>{'+'}</button>
      <button className={'button-zoomOut'}>{'-'}</button>
      <button className={'button-zenith'}>{'⦿'}</button>
    </footer>
  )
}

export default MapControls
