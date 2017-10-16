import React from 'react'

const MapControls = (props) => {
  return (
    <footer id={'mapControlsContainer'} className={'symbolText shadowL'}>
      <button className={'bold pillL darkGrey_bg'}>{'+'}</button>
      <button className={'bold pillM darkGrey_bg'}>{'-'}</button>
      <button className={'bold pillR darkGrey_bg blue_text'}>{'⦿'}</button>
    </footer>
  )
}

export default MapControls
