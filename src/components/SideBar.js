import React from 'react'
import classnames from 'classnames'
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
      <CardColumn cardList={props.cardList} actions={props.actions} viewport={props.viewport}/>
    </aside>
  )
}

export default SideBar
