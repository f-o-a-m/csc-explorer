import React from 'react'
import classnames from 'classnames'

const LayerControls = ({ zoom, layerList, actions, layerTrayOpen }) => {
  return (
    <footer id={'layerControlsContainer'}>
      <button
        className={'button-layers'}
        onClick={() => actions.toggleLayerTray()}>
        {'Layers'}
      </button>
      <Layers actions={actions} layerTrayOpen={layerTrayOpen} layers={layerList} zoom={zoom}/>
    </footer>
  )
}

const Layers = ({actions, layerTrayOpen, layers, zoom}) => {
  const trayMotionStyles = classnames({
    'layerTrayOpen': layerTrayOpen,
    'layerTrayClosed': !layerTrayOpen,
  })
  const layerToggles = layers.map(layer => {
    return (
      <LayerToggle
      onClick={() => actions.toggleLayer(layer.key, zoom)}
      title={layer.title}
      state={layer.state} />
    )
  })
  return <div className={`${trayMotionStyles} layerContainer`}>{ layerToggles }</div>
}

const LayerToggle = ({ onClick, title, state }) => {
  const status = classnames({
    'indicatorOn': state === 'ON',
    'indicatorOff': state === 'OFF',
    'indicatorHidden': state === 'HIDDEN'
  })
  return (
    <button className={'layerControl-toggle'} onClick={() => onClick()}>
      <div>{title}</div>
      <div className={`${status} indicator`} />
    </button>
  )
}

export default LayerControls
