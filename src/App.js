import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'

import base from './api/db'

import * as MapActions from './actions'

import Map from './components/Map'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import MapControls from './components/MapControls'
import Dash from './components/Dash'
import LayerControls from './components/LayerControls'

const FAKE_DATA_SOURCE_NAME = 'data'

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
    base.listenTo( FAKE_DATA_SOURCE_NAME, {
      context: this,
      asArray: true,
      then(data){ this.props.actions.setMapData(data) }
    })
    this.initGeolocation()
  }

  initGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getGeolocation)
    } else {
      console.error('Geolocation not supported by this browser') // or some other notification
    }
  }

  getGeolocation = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    if (latitude && longitude) {
      this.props.actions.setUserLocation({ latitude, longitude })
    } else {
      console.error('Invalid location data')
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.props.actions.resizeViewport(window.innerWidth, window.innerHeight))
  }


 render () {
  const {actions, store, ...mapStateToProps} = this.props
  const desat = classnames({ desat: this.props.dash })
    return (
      <div className={'app'}>

        <Dash
          actions={actions}
          dash={this.props.dash} />

        <div className={`desatFilter ${desat}`} />

        <SideBar
          viewport={this.props.viewport}
          actions={actions}
          cardList={this.props.cardList}
          sidebar={this.props.sidebar} />

        <TopBar actions={actions} />

        <MapControls
          actions={actions}
          viewport={this.props.viewport}
          unit={this.props.unit} />

        <LayerControls
          actions={actions}
          layerTrayOpen={this.props.layerTrayOpen}
          layerList={this.props.layerList}
          zoom={this.props.viewport.zoom} />

        <Map
          mapData={mapStateToProps.mapData}
          dispatch={store.dispatch}
          actions={actions}
          info={mapStateToProps.info}
          cellsAreExtruded={mapStateToProps.cellsAreExtruded}
          viewport={this.props.viewport} />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  viewport: state.viewportControls.viewport,
  cardList: state.cardControl.cardList,
  mapData: state.setMapData.mapData,
  sidebar: state.toggleSideBar.sidebar,
  dash: state.toggleDash.dash,
  unit: state.toggleThroughUnits.unit,
  layerTrayOpen: state.layerControl.layerTrayOpen,
  layerList: state.layerControl.layers,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MapActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
