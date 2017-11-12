import React, { Component } from 'react'
import classnames from 'classnames'

function Transaction() {
  const props = this.props
  const {date, title, address, bal} = info
  return (
    <div className={'cardContainer transactionCard'}>
      <span className={'transaction-lightWrap'}>
        <div className={'heading'}>
          <h3>{title}</h3>
          <h3>{bal}</h3>
        </div>
        <div classNAme={'metaData'}>
          <h3>{date}</h3>
          <h3>{address}</h3>
        </div>
      </span>
    </div>
  )
}

export default Transaction
