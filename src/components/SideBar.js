import React from 'react'
import Card from './Card'

const newCSC =
  {
    title: 'Create CSC',
    status: "STATUS_INFO",
    type: "SUBMIT",
  }

const SideBar = (props) => {
  let data = props.info
  return (
    <aside id={'sideBarContainer'} className={props.sidebar ? '' : 'closed'}>
      <div id={'searchWrapper'}>
        <input id={'searchbar'} placeholder={'Search the FOAM network'}/>
        <div id={'glass'}>{'🔎'}</div>
        <div id={'sideBarCollapse'} onClick={(e) => props.actions.toggleSidebar()}> {props.sidebar ? '<' : '>'} </div>
      </div>
      <div id={'cardWrapper'}>
      {props.newCSC ? <Card viewport={props.viewport} info={newCSC} actions={props.actions}/> : null}
      {
        data.map((info, i) => {
          return (
            <Card info={info} key={i} index={i} actions={props.actions}/>
          )
        })
      }
      </div>
    </aside>
  )
}

export default SideBar
