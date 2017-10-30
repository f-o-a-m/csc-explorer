import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import classnames from 'classnames'


const DotLayerGL = ({mapData, viewport}) => {
  // this would be better for scaling dots but is not performant
  // const calcDotScale = (z, offset, multiplier, minViewport) => {
  //   const scale = (minViewport - z + offset) * multiplier
  //   return Math.floor(scale)
  // }

  let r
  const blue = [47, 128, 237]
  const green = [39, 174, 96]
  // forgive me
  const z = viewport.zoom
  if ( z > 15) {
    r = 2
  } else if (z > 14) {
    r = 4
  } else if (z > 13) {
    r = 8
  } else if (z > 11) {
    r = 16
  } else if (z > 9) {
    r = 32
  } else {
    r = 64
  }

  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: mapData,
    radiusScale: 2,
    outline: false,
    getColor: d => d.status === 'STATUS_PROPOSAL' ? blue : green,
    getRadius: e => r,
    minRadius: 10,
    updateTriggers: {
       getRadius: r
     },
     fp64: true,
  });

  return (<DeckGL {...viewport} layers={[layer]} />);
}


export default DotLayerGL
