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
        <div className={`cardContainer shadowL ${statusStyle} ${cardType}`}>
          <button className={'x'} onClick={(e) => props.actions.removeMapsItemInfo(props.index)}>{'×'}</button>
          <div className={'message'}>
            {props.info.title !== '' ? <h3>{props.info.title}</h3> : null}
            <p>{props.info.message}</p>
          </div>
          <button className={'bigButton shadowL'}  style={{backgroundColor:props.info.buttonColor}}>{props.info.buttonText}</button>
        </div>
      )
    case 'MARKER':
      return(
        <div className={`cardContainer shadowL ${statusStyle} ${cardType}`}>
          <button className={'x'} onClick={(e) => props.actions.removeMapsItemInfo(props.index)}>{'×'}</button>
          <div className={'message'}>
            {props.info.title !== '' ? <h3>{props.info.title}</h3> : null}
            <p className={'dim'}>{'Address:'}</p>
            <p>{props.info.ethereumAddress}</p>
            <p className={'dim'}>{'Location:'}</p>
            <p>{props.info.address}</p>
            <p className={'dim'}>{'Category:'}</p>
            <p>{props.info.category}</p>
          </div>
          <div className={'cardBalance'}>
            <p>{props.info.balance}</p>
            <p>{'Total Tokens'}</p>
          </div>
          <button className={'bigButton shadowL'}  style={{backgroundColor:props.info.buttonColor}}>{'Deposit FOAM'}</button>
        </div>
      )
      // break;
    default:
      return(
        <div className={`cardContainer shadowL ${statusStyle}`}>
          <button className={'x'} onClick={(e) => props.actions.removeMapsItemInfo(props.index)}>{'×'}</button>
          <div className={'message'}>
            <p>{'No Data'}</p>
          </div>
          <button className={'bigButton shadowL'}  style={{backgroundColor:props.info.buttonColor}}>{props.info.buttonText}</button>
        </div>
      )
  }
}

export default Card
