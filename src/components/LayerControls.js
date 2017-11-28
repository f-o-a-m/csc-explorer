import React, { Component } from 'react'
import classnames from 'classnames'

const LayerControls = ({ zoom, layerList, actions, layerTrayOpen }) => {
  return (
    <footer id={'layerControls-container'}>
      <button
        className={'layers-tray-button'}
        onClick={() => actions.toggleLayerTray()}>
        {'Layers'}
      </button>
      <Layers actions={actions} layerTrayOpen={layerTrayOpen} layers={layerList} zoom={zoom}/>
    </footer>
  )
}

const Layers = ({actions, layerTrayOpen, layers, zoom}) => {
  const trayMotionStyles = classnames({
    'layerTray-open': layerTrayOpen,
    'layerTray-closed': !layerTrayOpen,
  })
  const layerToggles = layers.map(layer => {
    return (
      <LayerToggle
        toggleLayer={() => actions.toggleLayer(layer.key, zoom)}
        toggleLayerDialog={() => actions.toggleLayerDialog(layer.key)}
        layer={layer} />
    )
  })
  return <div className={`${trayMotionStyles} layerToggles-container`}>{ layerToggles }</div>
}

const LayerToggle = ({ toggleLayer, toggleLayerDialog, layer }) => {
  const { state, title, controls, controlsOpen } = layer
  const status = classnames({
    'indicator-on': state === 'ON',
    'indicator-off': state === 'OFF',
    'indicator-hidden': state === 'HIDDEN',
  })
  const trayButtonType = classnames({
    'layer-hasSettings': controls,
    'layer-noSettings': !controls,
  })
  return (
    <div className={'layerControl-toggle-pill-container'}>
      { controls ? <LayerPopup layer={layer} /> : null }
      <button className={`layer-name-button ${trayButtonType}`} onClick={() => toggleLayerDialog()}>{title}</button>
      <button className={'layer-toggle-button'} onClick={() => toggleLayer()}><div className={`${status} indicator`} /></button>
    </div>
  )
}

class LayerPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }

  handleChange = (e) => {
    e.target.value !== this.state.value ? this.setState({value: e.target.value}) : null
  }

  render() {
    const { layer } = this.props

    const popupMotionStyles = classnames({
      'layer-popup-open': layer.controlsOpen,
      'layer-popup-closed': !layer.controlsOpen,
    })

    const horizontalTravel = 318 - 16 // width of slider - width of knob
    const inputY = this.state.value
    const yMin = 0
    const yMax = 10
    const xMin = 0
    const xMax = horizontalTravel
    const percent = (inputY - yMin) / (yMax - yMin)
    const outputX = percent * (xMax - xMin) + xMin

    return (
      <div className={`${popupMotionStyles} layer-popup-container`}>
        <div className={'layer-popup-header'}>
          <h3>{layer.title}</h3>
        </div>
        <div className={'layer-popup-content'}>

          <div className={'layer-pop-control'}>
            <h3>{'Bot Speed'}</h3>
            <input
              type={'range'}
              min={`${yMin}`}
              max={`${yMax}`}
              value={this.state.value}
              onChange={(e) => this.handleChange(e)}
              step={'0.25'}
              className={'slider'} />
              <div className={'scale'}>
                <h3>{yMin}</h3>
                <h3 className={'currentVal'} style={{'left': `${outputX}px`}}>{this.state.value}</h3>
                <h3>{yMax}</h3>
              </div>
          </div>

        </div>
        <svg className={'layer-popup-chevron'} width="14" height="10" viewBox="0 0 14 10" version="1.1">
          <g id="Canvas" transform="scale(1) translate(-25353 1234)">
            <g id="Polygon 4">
              <use xlinkHref="#path0_fill" transform="matrix(-1 1.22465e-16 -1.22465e-16 -1 25365.8 -1223.92)"/>
            </g>
          </g>
          <defs>
            <path id="path0_fill" d="M 5.53761 1.33392C 5.93023 0.713994 6.83462 0.713994 7.22724 1.33392L 12.7648 10.0775L 0 10.0775L 5.53761 1.33392Z"/>
          </defs>
        </svg>
      </div>
    )

  }
}

export default LayerControls
