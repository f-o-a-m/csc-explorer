import React from 'react'
import classnames from 'classnames'
import LineGraph from './LineGraph'
import CardColumn from './CardColumn'
import { CloseButton } from './Atomics'

const DUMMY_TRANSACTIONS = [
  {
    date: 'Jan 30th, 2017',
    title: 'Deposited to CSC',
    ethAddress: '0x4defA30195094963cFAc7285',
    value:'-1.23',
    unit: 'FT',
    closable: false,
    type: 'TRANSACTION',
    status: 'STATUS_INFO',
  },
  {
    date: 'Jan 29th, 2017',
    title: 'Withdrew from CSC',
    ethAddress: '0x4defA30195sdf344cFAc7285',
    value:'2.2',
    unit: 'FT',
    closable: false,
    type: 'TRANSACTION',
    status: 'STATUS_INFO',
  }
]

const DUMMY_ACCOUNT = {
  balFT: 135,
  balEth: 1.344,
}

const Dash = (props) => {
  const dashStateClasses = classnames({
    'dash-closed': !props.dash,
    'dash-open': props.dash,
  })
  return (
    <aside id={'dash-container'} className={dashStateClasses}>
      <span className={'dash-column-small'}>
        <AccountGlance accountInfo={DUMMY_ACCOUNT} />
        <CardColumn cardList={DUMMY_TRANSACTIONS} viewport={false} actions={props.actions} />
      </span>
      <span className={'dash-column-large'}>
        <Stats />
        <AccountDetails />
      </span>
      <CloseButton closable={true} close={() => props.actions.toggleDash()} />
    </aside>
  )
}

const Stats = (props) => {
  // unfortunently calculate width for graph
  const width = window.innerWidth - 360 - 32 - 32 - 32 - 32 - 32 - 32
  return (
    <section className={'dash-tile'}>
      <div className={'dash-heading'}>
        <h3>{'FOAM Network Information'}</h3>
        <RangeControl />
      </div>
      <Hud />
      <div className={'dash-stats-d3'}>
        <div className={'dash-linegraph-container'}>
          <LineGraph
            width = { width }
            height = { 300 }
            margin = {{ left:0, right:0, top:0, bottom: 0 }}
          />
        </div>
      </div>
    </section>
  )
}

const Hud = (props) => {
  let tokenPriceStats = [
    <StatDatum unit={'FT'} value={1} prefixSymbol />,
    <StatDatum unit={'ETH'} value={0.165} />,
    <StatDatum unit={'BTC'} value={0.023} />,
  ]

  let deltas = [
    <StatDatum unit={'%'} value={-58.3} styleSign />,
    <StatDatum unit={'ETH'} value={0.12} styleSign />,
    <StatDatum unit={'BTX'} value={0.008} styleSign />,
  ]

  return (
    <div className={'dash-stats-hud'}>
      <StatModule stats={tokenPriceStats} title={'FOAM Token Price'}/>
      <StatModule stats={deltas} title={'Change Over Time'} />
    </div>
  )
}


const AccountDetails = (props) => {
  return (
    <section className={'dash-tile'}>
      <h3>{'Account Details'}</h3>

    </section>
  )
}

const StatDatum = ({ unit, value, styleSign, prefixSymbol }) => {
  const valueStyle = classnames({
    loss: styleSign && value < 0,
    gain: styleSign && value > 0,
  })
  return (
    <div className={'statDatum-wrapper'}>
      { prefixSymbol ? <img className={'img-ft'} src={'/foam_token.png'} /> : null }
      <div className={`statDatum-value ${valueStyle}`}>{ value }</div>
      <div className={'statDatum-unit'}>{ unit }</div>
    </div>
  )
}

const StatModule = ({ title, stats }) => {
  return (
    <div className={'stat-module'}>
      { stats }
    </div>
  )
}

const RangeControl = ({ setRange }) => {
  return (
    <div className={'dash-stats-rangeControl'}>
      <button className={'selected'}>{'1H'}</button>
      <button className={''}>{'1D'}</button>
      <button className={''}>{'1W'}</button>
      <button className={''}>{'1M'}</button>
      <button className={''}>{'1Y'}</button>
      <button className={''}>{'All'}</button>
    </div>
  )
}

const AccountGlance = ({ accountInfo }) => {
  const { balEth, balFT } = accountInfo
  return (
    <div className={'dash-accountGlance'}>
      <h3>{'Account Overview'}</h3>
      <div className={'stat-module'}>
        <StatDatum unit={'FT'} value={balFT} prefixSymbol />
        <StatDatum unit={'ETH'} value={balEth} />
      </div>
    </div>
  )
}

export default Dash
