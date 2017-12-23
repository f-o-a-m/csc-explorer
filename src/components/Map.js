import React, {Component} from 'react'
import MapGL, {experimental, Marker} from 'react-map-gl'
import lodash from 'lodash'
import { PerspectiveMercatorViewport } from 'viewport-mercator-project'
import geolib from 'geolib'
import { Motion, spring } from 'react-motion'
// import classnames from 'classnames'

import DotLayerGL from './DotLayerGL'
import Bubble from './Bubble'

import mapStyle from '../foam.css/mapStyle.json'

const TOKEN = 'pk.eyJ1IjoiZ2F0a2luc28iLCJhIjoiY2phbGE1ZmppMDBwbzJ3bXZ3dW93cngzZyJ9.XJk_Di1QXbLJhFoRZ8zz0g'

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
    // const bb = this.getProjectedViewportPolygon(e, window)
    // const culled = mapData.filter(datum => {
    //   let point = {latitude: datum.position[1], longitude: datum.position[0]}
    //   return geolib.isPointInside(point, bb) && datum[metric] > threshold
    // })
    // this.getHighlights(culled, e, metric)
    // tell redux
    this.props.actions.onViewportChange(e)
    this.props.actions.evalLayers(e.zoom)
  }

  renderMarkerList = (coords) => {
    return coords.map(datum => {
      return (
        <Marker
          longitude={datum.position[0]}
          latitude={datum.position[1]}
          ethereumAddress={datum.ethereumAddress}>
          <Bubble data={datum} getMapItemInfo={(e) => this.props.actions.getMapItemInfo(datum)}/>
        </Marker>
      )
    })
  }

  render() {
    const { mapData, viewport } = this.props
    const motionStyle = {
      latitude: spring(viewport.latitude, { stiffness: 170, damping: 26, precision: 0.00001 }),
      longitude: spring(viewport.longitude, { stiffness: 170, damping: 26, precision: 0.00001 }),
      zoom: spring(viewport.zoom, { stiffness: 170, damping: 26, precision: 0.00001 }),
      pitch: spring(viewport.pitch, { stiffness: 160, damping: 26, precision: 0.00001 }),
      bearing: spring(viewport.bearing, { stiffness: 160, damping: 26, precision: 0.00001 }),
    }
    return (
      <Motion style={motionStyle}>
        { ({ latitude, longitude, zoom, pitch, bearing }) => <MapGL
            {...viewport}
            latitude={latitude}
            longitude={longitude}
            zoom={zoom}
            pitch={pitch}
            bearing={bearing}
            mapStyle={mapStyle}
            onViewportChange={(e) => this.onViewportChange(e, mapData)}
            mapboxApiAccessToken={TOKEN}>
          </MapGL>
        }
      </Motion>
    )
  }
}

export default Map
