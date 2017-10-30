import React, {Component} from 'react'
import MapGL, {Marker, NavigationControl} from 'react-map-gl'
import PerspectiveMercatorViewport from 'viewport-mercator-project'
import ngeohash from 'ngeohash'
import classnames from 'classnames'
import DotLayerGL from './DotLayerGL'
import Bubble from './Bubble'

const BUBBLE_BOUNDING = [208, 32] //set bubble bounding box in px [width, height]

const TOKEN = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
    }
  }

  componentDidMount() {
    this.setState({mounted: true})
  }

  // debugGrid = () => {
  //   this.boundingBoxes.map((cell) => {
  //     const style = {
  //       width:cell.maxX,
  //       height:cell.maxY,
  //       display:'block',
  //       content:'debug',
  //       border:'1px solid red',
  //       zIndex: 999,
  //       position:'absolute',
  //       top: 0,
  //     }
  //     return <div style={style} />
  //   })
  // }
  //
  // makeGrid = () => {
  //   //make a grid with coords of the type expected by rbush
  //   const gridCellsX = 4
  //   const gridCellsY = 10
  //   const pitchX = window.innerWidth / gridCellsX
  //   const pitchY = window.innerHeight / gridCellsY
  //
  //   // make the grid
  //   const rows = [...Array(gridCellsX)].map((e, i) => {
  //     return [...Array(gridCellsY)].map((e, i) => {
  //       return {
  //         minX: i * pitchX,
  //         minY: i * pitchY,
  //         maxX: (i * pitchX) + pitchX,
  //         maxY: (i * pitchY) + pitchY,
  //       }
  //     })
  //   })
  //   return rows.reduce((a, b) => { return a.concat(b) })
  // }

  renderMapMarkers = (mapData, viewport) => {
    const mercatorViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      bearing: viewport.bearing,
      pitch: viewport.pitch,
      zoom: viewport.zoom,
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      altitude: viewport.altitude,
    }

    // make new PerspectiveMercatorViewport
    const projectedViewport = new PerspectiveMercatorViewport(mercatorViewport)
    let highlights = []
    let min = projectedViewport.unproject([0,0]) // [x,y] ==> [lng, lat]
    let max = projectedViewport.unproject([window.innerWidth, window.innerHeight])
    let gh = ngeohash.bboxes(min[1], min[0], max[1], max[0], 9)
    console.log(gh)
    let hash = ngeohash.encode(max[1], max[0], 9)
    console.log(hash)

    return highlights.map((datum) => {
      return (
        <Marker
          key={datum.geohash}
          longitude={datum.position[0]}
          latitude={datum.position[1]}
          ethereumAddress={datum.ethereumAddress}>
          <Bubble
            ethereumAddress={datum.ethereumAddress}
            status={datum.status}
            title={datum.title}
            balance={datum.balance}
            popularity={datum.popularity}
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
        onViewportChange={(e) => props.actions.onViewportChange(e)}
        ref={mapRef => this.mapRef = mapRef}
        mapboxApiAccessToken={TOKEN}>
        { props.mapData.length !== 0 ? this.renderMapMarkers(props.mapData, this.props.viewport) : null }
        { props.mapData.length !== 0 ? <DotLayerGL viewport={props.viewport} mapData={props.mapData} /> : null }
      </MapGL>
    )
  }
}

export default Map
