import React from 'react'

function CloseButton({closable, close}) {
  if (closable) {
    return (
      <button
        className={'button-closeCard'}
        onClick={close}>
        <span>{'×'}</span>
      </button>
    )
  } else {
    return null
  }
}

export {
  CloseButton,
}
