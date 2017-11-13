import React from 'react'

const TopBar = (props) => {
  return (
    <header id={'topBarContainer'}>
      <button className={'button-newCSC'} onClick={(e) => props.actions.initNewMapItem()}>{'New CSC +'}</button>
      <button className={'button-foam'} onClick={() => props.actions.toggleDash()}>
        {'5FT'}
        <img alt={''} className={'img-ft'} src={'/foam_token.png'} />
      </button>
    </header>
  )
}

export default TopBar
