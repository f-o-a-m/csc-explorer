import React from 'react'
import classnames from 'classnames'
import LineGraph from './LineGraph'

const Dash = (props) => {
  const dashStateClasses = classnames({
    'dash-closed': !props.dash,
    'dash-open': props.dash,
  })
  return (
    <aside id={'dash-container'} className={dashStateClasses}>
        <TransactionList />
        <span className={'dash-column-large'}>
          <Stats />
          <AccountInfo />
        </span>
      <button
        className={'button-closeDash'}
        onClick={() => props.actions.toggleDash()}>
        <span>{'×'}</span>
      </button>
    </aside>
  )
}

const Stats = (props) => {
  // unfortunently calculate width for graph
  const width = window.innerWidth - 360 - 32 - 32 - 32 - 32 - 32 - 32
  return (
    <section className={'dash-tile'}>
      <h1>{'FOAM Network Information'}</h1>
      <Hud />
      <div className={'dash-stats-d3'}>
        <div className={'dash-stats-rangeControl'}>
          <button className={'selected'}>{'1H'}</button>
          <button className={''}>{'1D'}</button>
          <button className={''}>{'1W'}</button>
          <button className={''}>{'1M'}</button>
          <button className={''}>{'1Y'}</button>
          <button className={''}>{'All'}</button>
        </div>
        <div className={'dash-linegraph-container'}>
          <LineGraph
            width = { width }
            height = {300}
            margin = {{ left:0, right:0, top:0, bottom: 0 }}
          />
        </div>
      </div>
    </section>
  )
}

const Hud = (props) => {
  return (
    <div className={'dash-stats-hud'}>
      {
      //  <h4>{'Foam Price'}</h4>
      }
    </div>
  )
}

const TransactionList = (props) => {
  return (
    <span className={'dash-column-small'}>
    </span>
  )
}

const AccountInfo = (props) => {
  return (
    <section className={'dash-tile'}>
      <h1>{'Account Information'}</h1>

    </section>
  )
}

export default Dash
