import React from 'react'

const MapControls = (props) => {
  return (
    <footer id={'mapControlsContainer'} className={'shadowL'}>
      <button className={'brl1 pillPad darkGrey'}>{'+'}</button>
      <button className={'darkGrey pillPad'}>{'-'}</button>
      <button className={'brr1 pillPad darkGrey'}>{'•'}</button>
    </footer>
  )
}

export default MapControls
