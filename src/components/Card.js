import React from 'react'
import classnames from 'classnames'

const Card = (props) => {
  const cardType = classnames({
    'info': props.info.type === 'INFO',
    'marker': props.info.status === 'MARKER',
  })

  const statusStyle = classnames({
    'green_bg': props.info.status === 'STATUS_ACTIVE',
    'blue_bg': props.info.status === 'STATUS_PROPOSAL',
    'darkGrey_bg': props.info.status === 'STATUS_INFO',
  })

  switch (props.info.type) {
    case 'INFO':
      return(
        <div className={`cardContainer ${statusStyle} ${cardType}`}>
          <button className={'x'} onClick={(e) => props.actions.removeMapsItemInfo(props.index)}>{'×'}</button>
          <div className={'message'}>
            {props.info.title !== '' ? <h3>{props.info.title}</h3> : null}
            <p>{props.info.message}</p>
          </div>
          <button className={'button-card'}  style={{backgroundColor:props.info.buttonColor}}>{props.info.buttonText}</button>
        </div>
      )
    case 'MARKER':
      return(
        <div className={`cardContainer ${statusStyle} ${cardType}`}>
          <div className={'message'}>
            <button className={'x'} onClick={(e) => props.actions.removeMapsItemInfo(props.index)}>{'×'}</button>
            {props.info.title !== '' ? <h3>{props.info.title}</h3> : null}
            <p className={'dim card-spacer-top'}>{'Address:'}</p>
            <p className={'address'}>{props.info.ethereumAddress}</p>
            <p className={'dim card-spacer'}>{'Location:'}</p>
            <p>{props.info.address}</p>
            <p className={'dim card-spacer'}>{'Category:'}</p>
            <p>{props.info.category}</p>
          </div>
          <button className={'button-card'} style={{backgroundColor:props.info.buttonColor}}>{'Deposit FOAM'}</button>
          <div className={'cardBalance'}>
            <h3 className={'balance'}>{props.info.balance}</h3>
            <p className={'dim'}>{'Total Tokens'}</p>
          </div>
        </div>
      )
      // break;
    default:
      return(
        <div className={`cardContainer ${statusStyle}`}>
          <button className={'x'} onClick={(e) => props.actions.removeMapsItemInfo(props.index)}>{'×'}</button>
          <div className={'message'}>
            <p>{'No Data'}</p>
          </div>
          <button className={'button-card'}  style={{backgroundColor:props.info.buttonColor}}>{props.info.buttonText}</button>
        </div>
      )
  }
}

export default Card
