import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Popup} from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay2.js';
import TopBar from './components/topbar'

import bikeJson from './data/sf-bike-parking.json'


import {json as requestJson} from 'd3-request';
import {csv as requestCsv} from 'd3-request';

// Set your mapbox token here
// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN; // eslint-disable-line

const token = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA';


// Source data CSV
const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';  // eslint-disable-line

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500,
        longitude: -0.2863654488525924,
        latitude: 51.57907519197516,
        zoom: 8,
        minZoom: 5,
        maxZoom: 15,
        pitch: 40.5,
        bearing: -27.396674584323023
      },
      data: null,
      coordinates: [-0.13235092163085938,51.518250335096376],
      info: "Hello"
    };

    // requestJson(bikeJson, (error, response) => {
    //   if (!error) {
    //     const data2 = response.map(d => ([Number(d.COORDINATES[0]), Number(d.COORDINATES[1])]));
    //     this.setState({data2: data2});
    //   }
    // });

    requestCsv(DATA_URL, (error, response) => {
      if (!error) {
        const data = response.map(d => ([Number(d.lng), Number(d.lat)]));
        this.setState({data});
      }
    });
  }

  componentWillMount(){
    // const data = bikeJson.map(d => ([Number(d.COORDINATES[0]), Number(d.COORDINATES[1])]));
    // this.setState({data: bikeJson});

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

  _onHover = (info) => {
    // console.log(info)
    if(info){
      this.setState({coordinates: info.lngLat})
    }
  }

  _onClick = (info) => {
    console.log(info)
    console.log(bikeJson[info.index])
    if(info){
      this.setState({coordinates: info.lngLat, info: info.object[2]})
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
          longitude={this.state.coordinates[0]}
          latitude={this.state.coordinates[1]}>
          <div>{this.state.coordinates}</div>
        </Popup>
        <DeckGLOverlay
          viewport={viewport}
          data={data || []}
          onHover={this._onHover}
          onClick={this._onClick}
          callbackFromParent={this._renderPopup}
        />
        <TopBar {...viewport} />
      </MapGL>
    );
  }
}
