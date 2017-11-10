import React from 'react'
import classnames from 'classnames'
import Card from './Card'

const newCSC = {
    title: 'Create CSC',
    status: "STATUS_INFO",
    type: "SUBMIT",
  }

const SideBar = (props) => {
  let data = props.info

  const cards = data.map((info, i) => {
    return <Card info={info} key={i} index={i} actions={props.actions}/>
  })

  const sideBarClasses = classnames({
    'sidebar-open': props.sidebar,
    'sidebar-closed': !props.sidebar,
  })

  const collapseSidebarClasses = classnames({
    'button-collapseSidebar-open': props.sidebar,
    'button-collapseSidebar-closed': !props.sidebar,
  })

  return (
    <aside id={'sideBarContainer'} className={sideBarClasses}>
      <div id={'searchWrapper'}>
        <input id={'searchbar'} placeholder={'Search the FOAM network'}/>
        <div id={'glass'}>{'🔎'}</div>
        <button id={'button-collapseSidebar'} className={collapseSidebarClasses} onClick={(e) => props.actions.toggleSidebar()}>{'<'}</button>
      </div>
      <div id={'cardColumn'}>
        {props.newCSC ? <Card viewport={props.viewport} info={newCSC} actions={props.actions}/> : null }
        { cards }
      </div>
    </aside>
  )
}

export default SideBar
