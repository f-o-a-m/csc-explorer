import React from 'react'

const cards = [
  {
    title: 'Welcome to FOAM',
    message: 'We are a protocol built to store and verify spatial addresses. Feel free to browse the map or take a look at the options below!',
    buttonText: 'Claim Your 5 FOAM tokens',
    color: '#343332',
  },
  {
    title: '',
    message: 'See how FOAM can help community sourced agriculture build sustainable community.',
    buttonText: 'See the Case Study',
    color: '#27AE60',
  },
  {
    title: '',
    message: 'Request address verification from the network.',
    buttonText: 'Create a Cryptospastial Coordinate',
    color: '#2F80ED',
  },
]

const Card = ({info}) => {
  return(
    <div id={'cardContainer'} style={{backgroundColor:info.color}}>
      <div className={'message'}>
        {info.title !== '' ? <h3>{info.title}</h3> : null}
        <p>{info.message}</p>
      </div>
      <button className={'bigButton'}>{info.buttonText}</button>
    </div>
  )
}

const SideBar = (props) => {
  return (
    <aside id='sideBarContainer'>
      <input id='searchbar'/>
      {
        cards.map((info) => {
          return (
            <Card info={info} />
          )
        })
      }
    </aside>
  )
}

export default SideBar
