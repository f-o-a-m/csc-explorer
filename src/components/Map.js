import React, {Component} from 'react'
import MapGL, {Marker} from 'react-map-gl'
import lodash from 'lodash'
import {PerspectiveMercatorViewport} from 'viewport-mercator-project'
import geolib from 'geolib'
// import classnames from 'classnames'

import DotLayerGL from './DotLayerGL'
import Bubble from './Bubble'

const TOKEN = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA'

const metric = 'popularity'
// a global threshold for displaying highlighted items
const threshold = 0.85

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highlights: [],
    }
  }

  // eventually it will be desirable to have a nominal # of bubbles on-screen
  getHighlights = (coords, viewport, metric) => {
    // get zoom level and calculate a geohash grid resolution to bin coordinates
    const z = viewport.zoom
    let res = Math.floor((z - 1) * 0.5) // geohash binning resolution
    let highlights = []

    // get a geohash at a resolution appropriate for zoom level
    const hasBins = coords.map(datum => {
      return Object.assign({...datum}, {bin: datum.geohash.substring(0, res)} )
    })

    // group by geohash
    const binned = lodash.groupBy(hasBins, 'bin')

    // get the highest value in bin with respect to metric
    Object.keys(binned).forEach(key => {
      const max = lodash.maxBy(binned[key], metric)
      highlights.push(max)
    })

    this.setState({highlights})
  }

  getProjectedViewportPolygon = (viewport, userWindow) => {
    // bounding box
    let bb = []
    const win = {height: userWindow.innerHeight, width: userWindow.innerWidth}
    const mercatorVP = new PerspectiveMercatorViewport(Object.assign({...viewport}, win))
    // convert [x,y] in px to [lat, lng] with perspective
    const topLeft = mercatorVP.unproject([1,1])
    const topRight = mercatorVP.unproject([win.width - 1, 1])
    const bottomRight = mercatorVP.unproject([win.width - 1, win.height - 1])
    const bottomLeft = mercatorVP.unproject([1, win.height - 1])
    // make an object that geolib.isPointInside expects
    bb.push({latitude: topLeft[1], longitude: topLeft[0]})
    bb.push({latitude: topRight[1], longitude: topRight[0]})
    bb.push({latitude: bottomRight[1], longitude: bottomRight[0]})
    bb.push({latitude: bottomLeft[1], longitude: bottomLeft[0]})
    return bb
  }

  onViewportChange = (e, mapData) => {
    // get items that are in viewport
    const bb = this.getProjectedViewportPolygon(e, window)
    const culled = mapData.filter(datum => {
      let point = {latitude: datum.position[1], longitude: datum.position[0]}
      return geolib.isPointInside(point, bb) && datum[metric] > threshold
    })
    this.getHighlights(culled, e, metric)
    // tell redux
    this.props.actions.onViewportChange(e)
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


  render() {
    const props = this.props

    return (
      <MapGL
        {...props.viewport}
        mapStyle={'mapbox://styles/mapbox/dark-v9'}
        onViewportChange={(e) => this.onViewportChange(e, this.props.mapData)}
        ref={mapRef => this.mapRef = mapRef}
        mapboxApiAccessToken={TOKEN}>
        { this.state.highlights !== 0 ? this.renderMarkerList(this.state.highlights) : null }
        { props.mapData.length !== 0 ? <DotLayerGL viewport={props.viewport} mapData={props.mapData} /> : null }
      </MapGL>
    )
  }
}

export default Map
