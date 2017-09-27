import React from 'react'
import './topbar.css';

const TopBar = (props) => {
  return (
    <div className='topbar'>
      <span className='address'>{props.latitude + ',' + props.longitude}</span>
    </div>
  )
}

export default TopBar
