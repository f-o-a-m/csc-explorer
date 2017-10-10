import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import base from './api/db'

import * as MapActions from './actions'
import Map from './components/Map'
import TopBar from './components/TopBar'

class App extends Component{
  constructor(props) {
   super(props)
   this.state = {
     data: [],
     loading: true,
   }
 }

 componentDidMount() {
  base.bindToState('data_CSC', {
    context: this,
    state: 'data',
    asArray: true,
    then() { this.setState({ loading: false }) }
    })
  }

 render () {
   const {actions, store, ...mapStateToProps} = this.props
   return (
     <div className={'app'}>
       <TopBar
         actions={actions}
         cellsAreExtruded={mapStateToProps.cellsAreExtruded} />
       <Map
          data={this.state.data}
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
   cellsAreExtruded: state.mapControls.cellsAreExtruded,
   viewport: state.viewportControls.viewport,
   info: state.getMapsItemInfo.info,
 })


const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators(MapActions, dispatch)
 })




export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
