import React, {Component} from 'react'
import MapGL, {Marker, NavigationControl} from 'react-map-gl'
import classnames from 'classnames'
import DotLayerGL from './DotLayerGL'

const TOKEN = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA'

const Bubble = ({data, getMapsItemInfo, status, title, balance, popularity, subTokens}) => {

  const hasSubTokens = subTokens > 0 ? true : false

  const statusStyle = classnames({
    'green_bg': status === 'STATUS_ACTIVE',
    'blue_bg': status === 'STATUS_PROPOSAL',
  })

  const showSubTokens = classnames({
    'hidden': !hasSubTokens,
  })

  return (
    <div id={'bubbleContainer'} className={`${statusStyle}`} onClick={(e) => getMapsItemInfo(data)}>
      <span id={'bubbleBody'} className={'shadowL'}>
        <p className={'bubbleText bubbleTitle'}>{title}</p>
        <p className={'bubbleText bubbleBalance'}>{balance}</p>
      </span>
      <span id={'bubbleDrawer'} className={showSubTokens}>
        <p className={'bubbleText bubbleTokens'}>{subTokens}</p>
      </span>
      <svg id={'chevron'} width="13" height="10" viewBox="0 0 13 10" version="1.1">
        <g id="Canvas" transform="translate(-25353 1234)">
          <g id="Polygon 4">
            <use xlinkHref="#path0_fill" transform="matrix(-1 1.22465e-16 -1.22465e-16 -1 25365.8 -1223.92)"/>
          </g>
        </g>
        <defs>
          <path id="path0_fill" d="M 5.53761 1.33392C 5.93023 0.713994 6.83462 0.713994 7.22724 1.33392L 12.7648 10.0775L 0 10.0775L 5.53761 1.33392Z"/>
        </defs>
      </svg>
    </div>
  )
}

const renderMapMarkers = (mapData, props) => {
  if (mapData.length > 0) {
    return mapData.map((datum, i) => {
      const { title, position, status, balance, popularity, subTokens, geohash} = datum
      if (popularity < 0.01) {
        return (
          <Marker
            key={geohash}
            longitude={position[0]}
            latitude={position[1]}>
            <Bubble
              getMapsItemInfo={props.actions.getMapsItemInfo}
              status={status}
              title={title}
              balance={balance}
              popularity={popularity}
              subTokens={subTokens}
              data={datum}
            />
          </Marker>
        )
      }
    })
  }
}

const Map = (props) => {
  return (
    <MapGL
      {...props.viewport}
      mapStyle={'mapbox://styles/mapbox/dark-v9'}
      onViewportChange={(e) => props.actions.onViewportChange(e)}
      mapboxApiAccessToken={TOKEN}>
      { renderMapMarkers(props.mapData, props) }
      { props.mapData.length !== 0 ? <DotLayerGL viewport={props.viewport} mapData={props.mapData} /> : null }
    </MapGL>
  )
}

export default Map
