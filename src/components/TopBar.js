import React from 'react'

const TopBar = (props) => {
  return (
    <header id={'topBarContainer'}>
      <button className={'button-newCSC'} onClick={(e) => props.actions.newMapsItem()}>{'New CSC +'}</button>
      <button className={'button-foam'}>
        {'5FT'}
        <img className={'img-ft'} src={'/foam_token.png'} />
      </button>
    </header>
  )
}

export default TopBar
