import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MapActions from './actions'

import Map from './components/Map'
import TopBar from './components/TopBar'

import './App.css'

const App = ({store, actions, cellsAreExtruded, viewport}) => (
  <div className={'app'}>
    <TopBar
      actions={actions}
      cellsAreExtruded={cellsAreExtruded} />
    <Map
      dispatch={store.dispatch}
      actions={actions}
      cellsAreExtruded={cellsAreExtruded}
      viewport={viewport} />
  </div>
)

// `mapStateToProps` filters the results of Redux states (store.getState()) into
// something that a Smart component needs, and then passes those into
// component as a prop.
const mapStateToProps = state => ({
  cellsAreExtruded: state.mapControls.cellsAreExtruded,
  viewport: state.viewportControls.viewport,
})

// `mapDispatchToProps` takes a set of action creators (which simply return action
// objects) and make them “dispatchable”. It then passes the object to
// components as a prop.
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MapActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
