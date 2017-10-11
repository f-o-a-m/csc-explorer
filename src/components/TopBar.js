import React from 'react'

const TopBar = (props) => {
  return (
    <header id={'topBarContainer'}>
      <button className={'pill blue shadowL'}>{'New CSC +'}</button>
      <button className={'pill darkGrey ml1 shadowL'}>
        {'5FT'}
        <img className={'ftimg ml1'} src={'/foam_token.png'} />

      </button>
    </header>
  )
}

export default TopBar
