import React from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
// import classnames from 'classnames'


const DotLayerGL = ({mapData, viewport}) => {
  // this would be better for scaling dots but is not performant
  // const calcDotScale = (z, offset, multiplier, minViewport) => {
  //   const scale = (minViewport - z + offset) * multiplier
  //   return Math.floor(scale)
  // }

  let r = 10
  const blue = [47, 128, 237]
  const green = [39, 174, 96]
  const pink = [244, 128, 104]
  // forgive me
  // const z = viewport.zoom
  // r = z * (0.1) // z = 20
  // r = z * (3) // z = 10
  // if ( z > 15) {
  //   r = 2
  // } else if (z > 14) {
  //   r = 4
  // } else if (z > 13) {
  //   r = 8
  // } else if (z > 11) {
  //   r = 16
  // } else if (z > 9) {
  //   r = 32
  // } else {
  //   r = 64
  // }

  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: mapData,
    radiusScale: 2,
    outline: false,
    getColor: d => d.status === 'STATUS_PROPOSAL' ? pink : pink,
    getRadius: e => r,
    minRadius: 2,
    // updateTriggers: {
    //    getRadius: r
    //  },
     fp64: false,
  });

  return (<DeckGL {...viewport} layers={[layer]} />);
}


export default DotLayerGL
