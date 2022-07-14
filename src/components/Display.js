import React from 'react'
import He from "he";

const Display = ({ 
    question,
    loading,
    error,
    handleAnswerOptionClick,
    getNewQuestions,
    showScore,
    score,
    totalScore,
    currentQuestion,
    responseCode
}) => {
  if (responseCode != 0) {
    return <p>Not enough questions, please choose another category or difficulty</p>
  }   else if (loading) {
      return <p>Loading...</p>;
     } else if (error) {
      return <p>Error: {error}</p>;
         } else if (showScore) {
      return (
          <div className="score-section">
            <p>You scored {score} out of 10 this round</p>
            <p>Total score is: {totalScore}</p>
            <button onClick={() => getNewQuestions()}>More Questions</button>
          </div>
      );
             } else {
      return (
        <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/10
              </div>
              <div className="question-text">
                {question === null ? <p>That doesnt seem to work, pleae try other options</p> : He.decode(question.results[currentQuestion].question)}
              </div>
            </div>
            <div className="answer-section">
              <button onClick={() => handleAnswerOptionClick("True")}>
                True
              </button>
              <button onClick={() => handleAnswerOptionClick("False")}>
                False
              </button>
            </div>
          </>
      );
    }
  }

export default Display