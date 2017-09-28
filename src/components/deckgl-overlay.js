/* global window */
import React, {Component} from 'react';
import DeckGL, {GridCellLayer} from 'deck.gl';

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.5, 0.0, 0.5, 0.0],
  numberOfLights: 3
};

const elevationScale = {min: 100, max: 10000};

const defaultProps = {
  radius: 1000,
  upperPercentile: 100,
  coverage: 1
};

const pickedColor = [134, 227, 173]
const defaultColor = [216, 149, 131]

export default class DeckGLOverlay extends Component {
  constructor(props) {
    super(props);
    this.startAnimationTimer = null;
    this.intervalTimer = null;
    this.state = {
      elevationScale: elevationScale.min
    };
  }

  _initialize(gl) {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }


  render() {
    const {viewport, data, radius, coverage, upperPercentile} = this.props;

    console.log(this.state)

    if (!data) {
      return null;
    }

    let layer = new GridCellLayer({
      id: 'grid-cell-layer',
      data,
      cellSize: 1000,
      getColor: () => this.props.picked ? defaultColor : pickedColor,
      elevationRange: [0, 3000],
      elevationScale: 1000,
      onHover: this.props.onHover,
      onClick: this.props.onClick,
      autoHighlight: true,
      opacity: 1,
      pickable: Boolean(this.props.onHover),
      // lightSettings: LIGHT_SETTINGS
    });

    return <DeckGL {...viewport} layers={[layer]} onWebGLInitialized={this._initialize} />;
  }
}

DeckGLOverlay.displayName = 'DeckGLOverlay';
DeckGLOverlay.defaultProps = defaultProps;
