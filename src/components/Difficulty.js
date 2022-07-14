import React from 'react'

const Difficulty = ({ setDifficulty, difficulty, getNewQuestions }) => {

    // Handle Difficulty
const handleDifficulty = (e) => {
    e.preventDefault();
    setDifficulty(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="selection">
    <label>Choose a difficulty:</label>

      <select name="difficulty" id="difficulty" onChange={handleDifficulty}
      value={difficulty}
      className="select">
        <option className="select-option" value="easy">Easy</option>
        <option className="select-option" value="medium">Medium</option>
        <option className="select-option" value="hard">Hard</option>
      </select>
      <button onClick={() => {
      getNewQuestions();
    }}>New Quiz</button>
    </div>
  )
}

export default Difficulty