import React from 'react'

const Confirmation = ({ confirm }) => {
  return (
    <div>{confirm === null ? "" : confirm ? <h1 className="correct">
    That was correct
  </h1> : <h1 className="incorrect">
    That was incorrect
  </h1>}</div>
  )
}

export default Confirmation