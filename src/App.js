import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import base from './api/db'

import * as MapActions from './actions'
import Map from './components/Map'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import MapControls from './components/MapControls'
import iconMapping from './data/location-icon-mapping.json'

const DATA_SOURCE_NAME = 'data'

class App extends Component{
  constructor(props) {
   super(props)
   this.state = {
     loading: true,
   }
 }

 resizeViewport = () => {
   this.props.actions.resizeViewport(window.innerWidth, window.innerHeight)
 }

  componentDidMount = () => {
    this.resizeViewport()
    window.addEventListener('resize', this.resizeViewport)
    base.listenTo(DATA_SOURCE_NAME, {
      context: this,
      asArray: true,
      then(data){ this.props.actions.setMapData(data) }
    })
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.props.actions.resizeViewport(window.innerWidth, window.innerHeight))
  }


 render () {
  const {actions, store, ...mapStateToProps} = this.props
    return (
      <div className={'app'}>
        <SideBar actions={actions} />
        <TopBar actions={actions} />
        <MapControls actions={actions}/>
        <Map
          mapData={mapStateToProps.mapData}
          dispatch={store.dispatch}
          actions={actions}
          info={mapStateToProps.info}
          cellsAreExtruded={mapStateToProps.cellsAreExtruded}
          viewport={mapStateToProps.viewport} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cellsAreExtruded: state.mapControls.cellsAreExtruded, //bool for DeckGL extrusion
  viewport: state.viewportControls.viewport, //it
  info: state.getMapsItemInfo.info, //picker
  mapData: state.setMapData.mapData
})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MapActions, dispatch)
})




export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
