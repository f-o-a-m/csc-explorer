import React from 'react'
import classnames from 'classnames'
import Card from './Card'

const CardColumn = ({actions, cardList, viewport}) => {

  const cards = cardList.map((info, i) => {
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
