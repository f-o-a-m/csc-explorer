import React from 'react'
import classnames from 'classnames'
import Card from './Card'

const CardColumn = ({actions, cardData, viewport}) => {

  const cards = cardData.map((info, i) => {
    return (
      <Card
        info={info}
        viewport={viewport}
        key={i}
        index={i}
        actions={actions} />
    )
  })

  return (
    <div id={'cardColumn'}>
      { cards }
    </div>
  )
}

export default CardColumn
