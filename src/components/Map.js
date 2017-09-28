import React, {Component} from 'react';
import MapGL, {Popup} from 'react-map-gl';

import DeckGLOverlay from './deckgl-overlay.js';
import TopBar from './TopBar'

import dataPoints from '../data/newDataPoints4.json'

// Set your mapbox token here
// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN; // eslint-disable-line

const token = 'pk.eyJ1IjoiY2FsbGlsIiwiYSI6ImNqN3V4eTVyazJqbWUzN25xdXNydzdrMXQifQ.Rsie4DpcanGTzTJgw8INWA';

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
        minZoom: 1,
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
    this.setState({data: dataPoints});
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
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
    // console.log(info)
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
