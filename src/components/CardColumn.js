import React from 'react'
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
    <div className={'cardColumn'}>
      { cards }
    </div>
  )
}

export default CardColumn
