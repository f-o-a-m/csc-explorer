import React from 'react'
import classnames from 'classnames'
import Card from './Card'
import CardColumn from './CardColumn'


const SideBar = (props) => {
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
      <CardColumn cardData={props.cardData} actions={props.actions} viewport={props.viewport}/>
    </aside>
  )
}

export default SideBar
