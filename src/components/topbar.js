import React from 'react'
import './TopBar.css'

const TopBar = (props) => {
  return (
    <div className='topbar'>
      <span className='address'>{props.latitude + ',' + props.longitude}</span>
      <span>{'selected' + ' ' + props.info}</span>
    </div>
  )
}

export default TopBar
