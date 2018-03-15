import React from 'react'
import classnames from 'classnames'

const Bubble = ({data, getMapItemInfo}) => {

  const tokenType = classnames({
    'green_bg': data.status === 'STATUS_ACTIVE',
    'blue_bg': data.status === 'STATUS_PROPOSAL',
  })

  const showSubTokens = classnames({
    'hidden': data.subTokens === 0,
  })

  return (
    <div className={`${tokenType} bubble-container`} onClick={getMapItemInfo}>
      <span className={'bubble-body'}>
        <p className={'bubble-title'}>{data.title}</p>
        <p className={'bubble-balance'}>{data.balance}</p>
      </span>
      <span className={`${showSubTokens} bubble-drawer`}>
        <p className={'bubble-tokens'}>{data.subTokens}</p>
      </span>
      <svg className={'bubble-chevron'} width="13" height="10" viewBox="0 0 13 10" version="1.1">
        <g id="Canvas" transform="translate(-25353 1234)">
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

export default Bubble
