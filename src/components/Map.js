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

  // this could probably be improved
  filterMapMarkers = (coords, viewport, metric) => {
    // get zoom level and calculate a geohash grid resolution to bin coordinates
    const z = viewport.zoom
    let resolution = Math.floor((z - 1) * 0.5)
    let highlights = []

    // a global threshold for showing popular items
    const metricThresh = 0.95

    // trim each coord geohash to resolution
    let hashTrimmedCoords = coords.map(coord => {
      let c = coord
      c.geohash_trim = coord.geohash.substring(0, resolution)
      return c
    })

    // bin coords by their geohash owners
    let binnedHashes = lodash.groupBy(hashTrimmedCoords, 'geohash_trim')

    // get the coords with the highest metric value, and the ones that pass metricThresh
    Object.keys(binnedHashes).map(hash => {
      let coords = binnedHashes[hash]
      let max = coords.reduce((prev, current) => {
        let result = (prev[metric] > current[metric]) ? prev : current
        return result
      })
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
