import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import classnames from 'classnames'


const DotLayerGL = ({mapData, viewport}) => {

  /**
   * Data format:
   * [
   *   {position: [-122.4, 37.7], radius: 5, color: [255, 0, 0]},
   *   ...
   * ]
   */
  let zoom = viewport.zoom * 0.4

  if (viewport.zoom > 14) {
    zoom = zoom * 0.2
  }

  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: mapData,
    radiusScale: 10,
    outline: false,
    getRadius: e => zoom,
    updateTriggers: {
       getRadius: zoom
     }
  });

  return (<DeckGL {...viewport} layers={[layer]} />);
}


export default DotLayerGL
