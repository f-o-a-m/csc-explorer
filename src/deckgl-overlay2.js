/* global window */
import React, {Component} from 'react';
import DeckGL, {GridLayer} from 'deck.gl';

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 1
};

// const colorRange = [
//   [1, 152, 189],
//   [73, 227, 206],
//   [216, 254, 181],
//   [254, 237, 17],
//   [254, 173, 84],
//   [209, 55, 78]
// ];

const colorRange = [
  // [145, 192, 255],
  // [142, 210, 231],
  // [238, 221, 140],
  // [242, 201, 76],
  // [202, 200, 82],
  [193,193,193],
  [124, 194, 106],
  [69, 190, 120]
];

// const colorRange = [
//   [226, 204, 198],
//   [205, 160, 149],
//   [216, 149, 131],
//   [137, 92, 81],
//   [125, 77, 64],
//   [101, 53, 40],
//   [58, 21,]
// ];

const elevationScale = {min: 1, max: 10};

const defaultProps = {
  radius: 1000,
  upperPercentile: 100,
  coverage: 1
};

export default class DeckGLOverlay extends Component {

  static get defaultColorRange() {
    return colorRange;
  }

  constructor(props) {
    super(props);
    this.startAnimationTimer = null;
    this.intervalTimer = null;
    this.state = {
      elevationScale: elevationScale.min
    };

    this._startAnimate = this._startAnimate.bind(this);
    this._animateHeight = this._animateHeight.bind(this);

  }

  componentDidMount() {
    this._animate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length !== this.props.data.length) {
      this._animate();
    }
  }

  componentWillUnmount() {
    this._stopAnimate();
  }

  _animate() {
    this._stopAnimate();

    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
  }

  _startAnimate() {
    this.intervalTimer = window.setInterval(this._animateHeight, 20);
  }

  _stopAnimate() {
    window.clearTimeout(this.startAnimationTimer);
    window.clearTimeout(this.intervalTimer);
  }

  _animateHeight() {
    if (this.state.elevationScale === elevationScale.max) {
      this._stopAnimate();
    } else {
      this.setState({elevationScale: this.state.elevationScale + 1});
    }
  }

  _initialize(gl) {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  render() {
    const {viewport, data, radius, coverage, upperPercentile} = this.props;

    if (!data) {
      return null;
    }

    const layers = [
      new GridLayer({
        id: 'grid-layer',
        colorRange,
        coverage,
        data,
        elevationRange: [0, 500],
        cellSize: 500,
        elevationScale: this.state.elevationScale,
        extruded: true,
        getPosition: d => d,
        lightSettings: LIGHT_SETTINGS,
        onHover: this.props.onHover,
        onClick: this.props.onClick,
        opacity: 1,
        pickable: Boolean(this.props.onHover),
        radius,
        upperPercentile
      })
    ];

    return <DeckGL {...viewport} layers={layers} onWebGLInitialized={this._initialize} />;
  }
}

DeckGLOverlay.displayName = 'DeckGLOverlay';
DeckGLOverlay.defaultProps = defaultProps;
