import React from 'react'
import './TopBar.css'

const TopBar = (props) => {
  return (
    <div className='topbar'>
      <span className='address'>{props.latitude + ',' + props.longitude}</span>
      <span>{'selected' + ' ' + props.info}</span>
      <button onClick={props.actions.toggleCellExtrusion}>{'Toggle Cell Extrusion'}</button>
    </div>
  )
}

export default TopBar
