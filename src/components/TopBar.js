import React from 'react'

const TopBar = (props) => {
  return (
    <header id={'topBarContainer'}>
      <button className={'bold pill blue_bg'}>{'New CSC +'}</button>
      <button className={'bold pill darkGrey_bg ml1 '}>
        {'5FT'}
        <img className={'ftimg ml1'} src={'/foam_token.png'} />
      </button>
    </header>
  )
}

export default TopBar
