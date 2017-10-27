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
          {props.info.title ?
          <div className={'title'}>
              <button className={'x'} onClick={(e) => props.actions.removeMapsItemInfo(props.index)}>{'×'}</button>
              {props.info.title !== '' ? <h3>{props.info.title}</h3> : null}
          </div>
          : <button className={'x'} onClick={(e) => props.actions.removeMapsItemInfo(props.index)}>{'×'}</button> }
          <div className={'message'}>
            <p>{props.info.message}</p>
          </div>
          <button className={'button-card'}  style={{backgroundColor:props.info.buttonColor}}>{props.info.buttonText}</button>
        </div>
      )
    case 'MARKER':
      return(
        <div className={`cardContainer ${statusStyle} ${cardType}`}>
          <div className={'title'}>
            <button className={'x'} onClick={(e) => props.actions.removeMapsItemInfo(props.index)}>{'×'}</button>
            {props.info.title !== '' ? <h3>{props.info.title}</h3> : null}
          </div>
          <div className={'message'}>
            <p className={'dim card-spacer-top'}>{'Address:'}</p>
            <p className={'address'}>{props.info.ethereumAddress}</p>
            <p className={'dim card-spacer'}>{'Location:'}</p>
            <p>{props.info.address}</p>
            <p className={'dim card-spacer'}>{'Category:'}</p>
            <p>{props.info.category}</p>
          </div>
          <button className={'button-card'} style={{backgroundColor:props.info.buttonColor}}>{'Deposit FOAM'}</button>
          {props.info.balance ?
            <div className={'cardBalance'}>
              <h3 className={'balance'}>{props.info.balance}</h3>
              <p className={'dim'}>{'Total Tokens'}</p>
            </div>
            : null }
        </div>
      )
      // break;
    case 'SUBMIT':
      return(
        <form className={`cardContainer ${statusStyle} ${cardType}`}>
          <div className={'title'}>
            <button className={'x'} onClick={(e) => props.actions.newMapsItem()}>{'×'}</button>
            {props.info.title !== '' ? <h4>{props.info.title}</h4> : null}
          </div>
          <div className={'description'}>
            <p className={'dim card-spacer'}>{'Associate a crypto spatial coordinate with a physical location.'}</p>
          </div>
          <div className={'message'}>
            <p className={'dim card-spacer'}>{'Location:'}</p>
            <input type="text" className={'card-input'} value={props.viewport.longitude + ',' + props.viewport.latitude}/>
            <p className={'dim card-spacer'}>{'Category:'}</p>
            <input type="text" className={'card-input'} placeholder={'enter a category'}/>
          </div>
          <button className={'button-card'}  style={{backgroundColor:props.info.buttonColor}} onSubmit={(e) => props.actions.newMapsItem()}>{'Submit'}</button>
        </form>
      )
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
