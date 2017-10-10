import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MapActions from './actions'

import Map from './components/Map'
import TopBar from './components/TopBar'

const App = ({...mapStateToProps, actions, store}) => (
  <div className={'app'}>
    <TopBar
      actions={actions}
      cellsAreExtruded={mapStateToProps.cellsAreExtruded} />
    <Map
      dispatch={store.dispatch}
      actions={actions}
      info={mapStateToProps.info}
      cellsAreExtruded={mapStateToProps.cellsAreExtruded}
      viewport={mapStateToProps.viewport} />
  </div>
)

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
