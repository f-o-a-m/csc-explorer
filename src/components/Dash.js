import React from 'react'

const Dash = (props) => {
  return (
    <aside id={'dash-container'}>
      <TransactionList />
      <span className={'dash-column-large'}>
        <Stats />
        <AccountInfo />
      </span>
    </aside>
  )
}

const Stats = (props) => {
  return (
    <section className={'dash-tile'}>
      <h1>{'FOAM Network Information'}</h1>
      <div className={'dash-stats-hud'}>

      </div>
      <div className={'dash-stats-d3'}>
      </div>
    </section>
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
