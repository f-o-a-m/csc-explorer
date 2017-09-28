import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Popup} from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay2.js';
import TopBar from './components/topbar'

import dataPoints from './newDataPoints.json'


import {json as requestJson} from 'd3-request';
import {csv as requestCsv} from 'd3-request';

// Set your mapbox token here
// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN; // eslint-disable-line

const token = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA';

const data2 = [
  {
    name: 'test1',
    position: [-122.4, 37.7],
    color: [216,149, 131],
    elevation: 100
  },
  {
    name: 'name',
    position: [-122.437875,37.75],
    color: [216,149, 131],
    elevation: 5
  },
  {
    name: 'name',
    position: [-122.44,37.772737],
    color: [216,149, 131],
    elevation: 100
  },
  {
    name: 'name', position: [-122.42019976,37.75087429],
    color: [216,149, 131],
    elevation: 200
  },
  {
    name: 'name', position: [-122.48,37.65],
    color: [216,149, 131],
    elevation: 1
  },
  {
    name: 'name', position: [-122.43065953,37.77185018],
    color: [216,149, 131],
    elevation: 200
  },
  {
    name: 'name', position: [-122.44,37.79],
    color: [216,149, 131],
    elevation: 1
  },
  {
    name: 'name', position: [-122.39,37.52],
    color: [216,149, 131],
    elevation: 2
  },
  {
    name: 'name', position: [-122.43065953,37.77185018],
    color: [216,149, 131],
    elevation: 65
  },
  {
    name: 'name', position: [-122.41208129546884, 37.81092440397635],
    color: [216,149, 131],
    elevation: 3
  },
  {
    name: 'name', position: [-122.38,37.77185018],
    color: [216,149, 131],
    elevation: 32
  },
  {
    name: 'name', position: [-122.41208129546884, 37.81092440397635],
    color: [216,149, 131],
    elevation: 99
  },
  {
    name: 'name', position: [-122.43065953,37.77185018],
    color: [216,149, 131],
    elevation: 6
  }
]


// Source data CSV
// const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';  // eslint-disable-line

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500,
        longitude: -122.456,
        latitude: 37.751,
        zoom: 12,
        minZoom: 5,
        maxZoom: 15,
        pitch: 40.5,
        bearing: -27.396674584323023
      },
      data: null,
      coordinates: [-0.13235092163085938,51.518250335096376],
      info: "Hello"
    };

  }

  componentWillMount(){
    this.setState({data: data2});
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _renderPopup = (info) => {
    console.log(info);
    if(info){
      this.setState({coordinates: info.lngLat, info: info.object[2]});
    }
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  _setName = (info) => {

    if(info){
      this.setState({info: info.object.name, coordinates: info.lngLat})
    }
  }

  _onHover = (info) => {
    console.log(info)
    // if()
    // if(info){
    //   this.setState({info: info.object.name, coordinates: info.lngLat})
    // }
  }

  _onClick = (info) => {
    console.log(info)
    if(info){
      this.setState({info: info.object.name + info.index, coordinates: info.lngLat})
    }
  }

  render() {
    const {viewport, data} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={token}>
        <Popup
          // onClick={}
          longitude={this.state.coordinates[0]}
          latitude={this.state.coordinates[1]}>
          <div>{this.state.info}</div>
        </Popup>
        <DeckGLOverlay
          viewport={viewport}
          data={data || []}
          onHover={this._onHover}
          onClick={this._onClick}
          callbackFromParent={this._renderPopup}
        />
        <TopBar {...viewport} {...this.state} />
      </MapGL>
    );
  }
}
