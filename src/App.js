import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import base from './api/db'

import * as MapActions from './actions'
import Map from './components/Map'
import TopBar from './components/TopBar'

const DATA_SOURCE_NAME = 'data_CSC'

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
        <TopBar
          actions={actions}
          cellsAreExtruded={mapStateToProps.cellsAreExtruded} />
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
