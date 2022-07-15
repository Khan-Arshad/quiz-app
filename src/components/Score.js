import React from 'react'

const Score = ({ score, totalScore }) => {
  return (
    <div className="score-section">
            <p>You scored {score} out of 10 this round</p>
            <p>Total score is: {totalScore}</p>
          </div>
  )
}

export default Score