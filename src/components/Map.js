import React, {Component} from 'react'
import MapGL, {Marker} from 'react-map-gl'
import lodash from 'lodash'
// import classnames from 'classnames'

import DotLayerGL from './DotLayerGL'
import Bubble from './Bubble'

const TOKEN = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highlights: [],
    }
  }

  filterMapMarkers = (coords, viewport, metric) => {
    // get zoom level and calculate a geohash grid resolution to bin coordinates
    const z = viewport.zoom
    let res = Math.floor((z - 1) * 0.5) // geohash binning resolution
    let highlights = []

    // a global threshold for displaying highlighted items
    const metricThresh = 0.96

    // get a geohash at a resolution appropriate for zoom level
    const hasBins = coords.map(datum => {
      return Object.assign({...datum}, {bin: datum.geohash.substring(0, res)} )
    })

    // group by geohash
    const binned = lodash.groupBy(hasBins, 'bin')

    // get the highest value in bin with respect to metric
    Object.keys(binned).forEach(hashKey => {
      const bin = binned[hashKey]
      const max = lodash.maxBy(bin, metric)
      max[metric] > metricThresh ? highlights.push(max) : null
    })

    this.setState({highlights})
  }

  renderMarkerList = (coords) => {
    return coords.map(datum => {
      return (
        <Marker
          longitude={datum.position[0]}
          latitude={datum.position[1]}
          ethereumAddress={datum.ethereumAddress}>
          <Bubble
            status={datum.status}
            title={datum.title}
            balance={datum.balance}
            subTokens={datum.subTokens}/>
        </Marker>
      )
    })
  }

  onViewportChange = (e) => {
    this.props.actions.onViewportChange(e)
    this.filterMapMarkers(this.props.mapData, this.props.viewport, 'popularity')
  }


  render() {
    const props = this.props

    return (
      <MapGL
        {...props.viewport}
        mapStyle={'mapbox://styles/mapbox/dark-v9'}
        onViewportChange={(e) => this.onViewportChange(e)}
        ref={mapRef => this.mapRef = mapRef}
        mapboxApiAccessToken={TOKEN}>
        { this.state.highlights !== 0 ? this.renderMarkerList(this.state.highlights) : null }
        { props.mapData.length !== 0 ? <DotLayerGL viewport={props.viewport} mapData={props.mapData} /> : null }
      </MapGL>
    )
  }
}

export default Map
