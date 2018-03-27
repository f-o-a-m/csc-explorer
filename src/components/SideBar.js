import React from 'react'
import classnames from 'classnames'
import CardColumn from './CardColumn'

import axios from 'axios'
import geohash from 'latlon-geohash'

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
        <input
          type={'text'}
          id={'searchbar'}
          placeholder={'Search the FOAM network'}
          onKeyPress={event => {

            if (event.key === 'Enter') {

              let searchUrl = 'https://api-beta.foam.space/search?q=' + event.target.value;
              let headers = { 'Authorization': "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJkYXQiOiIyY2UyYWRjZTVlZmUzYTRhZDlmNDUyNWExNTc4YWUyMzZhMDEzNjY5In0.AvONC6EaU02hvmHfKOj8DK2Ur6krtdpZmibvL__R6XAOLGrDhAMrpURcUNfF_D33QQ6LQQPlYjdPGjAX36JcVQ" };
              
              axios.get(searchUrl, { headers: headers })
                .then((response) => {
              
                  let beacon_url = 'https://api-beta.foam.space/beacon/' + response.data[0]['shDocId'];
                  return axios.get(beacon_url, { headers: headers })
              
                })
                .then((response) => {
              
                  let foundBeacon = response.data;
                  let returnBeacons = []
                  let l = geohash.decode(foundBeacon.beaconGeohash)
                  let b = {}
              
                  b.position = [l.lon, l.lat]
                  b.address = "address"
                  b.geohash = foundBeacon.beaconGeohash
                  b.balance = 0
                  b.category = ""
                  b.ethereumAddress = foundBeacon.beaconBeaconAddress
                  b.popularity = 0.12
                  b.status = "STATUS_PROPOSAL"
                  b.subTokens = 0
                  b.title = foundBeacon.beaconName
              
                  returnBeacons.push(b);
              
                  props.actions.setMapData(returnBeacons)
                  props.actions.goToLocation(returnBeacons[0].position)
              
                });
            }
          }}
        />
        <div id={'glass'}>{'�'}</div>
        <button id={'button-collapseSidebar'} className={collapseSidebarClasses} onClick={(e) => props.actions.toggleSidebar()}>{'<'}</button>
      </div>
      <CardColumn cardList={props.cardList} actions={props.actions} viewport={props.viewport} />
    </aside>
  )
}

export default SideBar
