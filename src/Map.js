import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';

import {json as requestJson} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN; // eslint-disable-line

// Source data CSV
const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/icon/meteorites.json';  // eslint-disable-line

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      data: null,
      iconMapping: null,
      hoveredItem: null,
      clickedItem: null
    };

    requestJson(DATA_URL, (error, response) => {
      if (!error) {
        this.setState({data: response});
      }
    });
    requestJson('./data/location-icon-mapping.json', (error, response) => {
      if (!error) {
        this.setState({iconMapping: response});
      }
    });
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

  _onHover(info) {
    this.setState({hoveredItem: info});
    console.log(info)
  }

  _onClick(info) {
    this.setState({clickedItem: info});
    console.log(info)
  }

  render() {
    const {viewport, data, iconMapping} = this.state;

    return (
      <MapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={this._onViewportChange.bind(this)}
      mapboxApiAccessToken={MAPBOX_TOKEN}>
      <DeckGLOverlay viewport={viewport}
        data={data}
        iconAtlas="data/location-icon-atlas.png"
        iconMapping={iconMapping}
        showCluster={true}
        />
    </MapGL>
    );
  }
}
