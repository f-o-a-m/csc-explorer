import React, { Component } from 'react'
import classnames from 'classnames'

function Info({info, actions}) {
  return (
    <span className={'card-lightWrap'}>
      <h3>{info.title}</h3>
      <p>{info.message}</p>
      <button className={'button-card'}>
        {info.buttonText}
      </button>
    </span>
  )
}

function Marker({info, actions}) {
  return (
    <span className={'card-lightWrap'}>
      <h3>{info.title}</h3>
      <div className={'message'}>
        <p className={'dim card-spacer-top'}>{'Address:'}</p>
        <p className={'address'}>{info.ethereumAddress}</p>
        <p className={'dim card-spacer'}>{'Location:'}</p>
        <p>{info.address}</p>
        <p className={'dim card-spacer'}>{'Category:'}</p>
        <p>{info.category}</p>
      </div>
      <button className={'button-card'}>{'Deposit FOAM'}</button>
      {info.balance ?
        <div className={'cardBalance'}>
          <h3 className={'balance'}>{info.balance}</h3>
          <p className={'dim'}>{'Total Tokens'}</p>
        </div>
        : null }
    </span>
  )
}

function Submit({info, actions, viewport}) {
  return (
      <form className={'card-lightWrap'}>
        <h3>{info.title}</h3>
        <p className={'dim card-spacer'}>{'Associate a crypto spatial coordinate with a physical location.'}</p>
        <div className={'message'}>
          <p className={'dim card-spacer'}>{'Location:'}</p>
          <input type="text" className={'card-input'} value={`${viewport.longitude}, ${viewport.latitude}`}/>
          <p className={'dim card-spacer'}>{'Category:'}</p>
          <input type="text" className={'card-input'} placeholder={'Enter a category'}/>
        </div>
        <button className={'button-card'} onSubmit={(e) => actions.newMapsItem()}>{'Submit'}</button>
      </form>
  )
}

function NoData() {
  return (
    <span className={'card-lightWrap'}>
      <div className={'message'}>
        <p>{'No Data'}</p>
      </div>
    </span>
  )
}

class Card extends Component {
  render() {
    const props = this.props
    const cardType = classnames({
      'info': props.info.type === 'INFO',
      'marker': props.info.status === 'MARKER',
    })

    const statusStyle = classnames({
      'green_bg': props.info.status === 'STATUS_ACTIVE',
      'blue_bg': props.info.status === 'STATUS_PROPOSAL',
      'darkGrey_bg': props.info.status === 'STATUS_INFO',
    })

    let content
    switch (props.info.type) {
      case 'INFO':
        content = <Info info={props.info} actions={props.actions}/>
        break
      case 'MARKER':
        content = <Marker info={props.info} actions={props.actions}/>
        break
      case 'SUBMIT':
        content = <Submit info={props.info} actions={props.actions} viewport={props.viewport}/>
        break
      default:
        content = <NoData info={props.info} actions={props.actions}/>
        break
    }
    return (
      <div className={`cardContainer ${statusStyle} ${cardType}`}>
        <button
          className={'button-closeCard'}
          onClick={(e) => props.actions.removeMapItemInfo(props.index)}>
          <span>{'×'}</span>
        </button>
        {content}
      </div>
    )
  }
}

export default Card
