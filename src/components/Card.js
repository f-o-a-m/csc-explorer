import React, { Component } from 'react'
import classnames from 'classnames'
import { CloseButton } from './Atomics'

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

function Transaction({info}) {
  const {date, title, ethAddress, balance} = info
  return (
    <span className={'card-lightWrap'}>
      <div className={'transaction-heading'}>
        <div className={'transaction-title'}>{title}</div>
        <div className={'transaction-balance'}>{balance}<i>{' FT'}</i></div>
      </div>
      <div className={'transaction-metadata'}>
        <div className={'transaction-date'}><i>{date}</i></div>
        <div className={'transaction-address'}><i>{ethAddress}</i></div>
      </div>
    </span>
  )
}

class Card extends Component {
  render() {
    const { info, actions, viewport, index } = this.props

    const statusStyle = classnames({
      'green_bg': info.status === 'STATUS_ACTIVE',
      'blue_bg': info.status === 'STATUS_PROPOSAL',
      'darkGrey_bg': info.status === 'STATUS_INFO',
    })

    let content
    switch (info.type) {
      case 'INFO':
        content = <Info info={info} actions={actions}/>
        break
      case 'MARKER':
        content = <Marker info={info} actions={actions}/>
        break
      case 'SUBMIT':
        content = <Submit info={info} actions={actions} viewport={viewport}/>
        break
      case 'TRANSACTION':
        content = <Transaction info={info} />
        break
      default:
        content = <NoData info={info} actions={actions}/>
        break
    }

    return (
      <div className={`cardContainer ${statusStyle}`}>
        <CloseButton closable={info.closable} close={() => actions.removeMapItemInfo(index)} />
        {content}
      </div>
    )
  }
}

export default Card
