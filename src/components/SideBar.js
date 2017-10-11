import React from 'react'

const cards = [
  {
    title: 'Welcome to FOAM',
    message: 'We are a protocol built to store and verify spatial addresses. Feel free to browse the map or take a look at the options below!',
    buttonText: 'Claim Your 5 FOAM tokens',
    color: '#242424', //eventually we'll just have a messageType key that handles this with css class
    buttonColor: '#333333',
  },
  {
    title: '',
    message: 'See how FOAM can help community sourced agriculture build sustainable community.',
    buttonText: 'See the Case Study',
    color: '#27AE60',
    buttonColor: '#51CB84',
  },
  {
    title: '',
    message: 'Request address verification from the network.',
    buttonText: 'Create a Cryptospastial Coordinate',
    color: '#2F80ED',
    buttonColor: '#63A4FC',
  },
]

const Card = ({info, i}) => {
  return(
    <div key={i} id={'cardContainer'} className={'shadowL'} style={{backgroundColor:info.color}}>
      <button className={'x'}>{'×'}</button>
      <div className={'message'}>
        {info.title !== '' ? <h3>{info.title}</h3> : null}
        <p>{info.message}</p>
      </div>
      <button className={'bigButton shadowL'}  style={{backgroundColor:info.buttonColor}}>{info.buttonText}</button>
    </div>
  )
}

const SideBar = (props) => {
  return (
    <aside id={'sideBarContainer'}>
      <div id={'searchWrapper'}>
        <input id={'searchbar'} className={'shadowL'} placeholder={'Search the FOAM network'}/>
        <div id={'glass'}>{'🔎'}</div>
      </div>
      // {
      //   cards.map((info, i) => {
      //     return (
      //       <Card info={info} key={i}/>
      //     )
      //   })
      }
    </aside>
  )
}

export default SideBar
