import React from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';

const DotLayerGL = (props) => {
  let r = 10
  const updateTrigger = props.shouldUpdate;
  const blue = [47, 128, 237]
  const blue2 = [47, 128, 237, 50]
  const pink = [244, 128, 104]

  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: props.mapData,
    radiusScale: 2,
    outline: false,
    pickable: true,
    getColor: d => blue,
    getRadius: e => e.picked ? r*5 : r,
    onClick: props.onClick,
    // onHover: props.onHover,
    minRadius: 10,
    updateTriggers: {
       // getRadius: updateTrigger,
       getColor: updateTrigger
     },
     fp64: true,
  });

  const layer2 = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: [props.mapData[props.selected]],
    radiusScale: 2,
    outline: false,
    pickable: true,
    getColor: d => d.picked ? blue2 : blue2,
    getRadius: e => e.picked ? r*5 : r,
    minRadius: 10,
    updateTriggers: {
       getRadius: updateTrigger,
       getColor: updateTrigger
     },
     fp64: true,
  });

  return (<DeckGL {...props.viewport} layers={[layer, layer2]} />);
}

export default DotLayerGL
