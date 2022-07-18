import React from 'react'
import He from "he";

const Display = ({ 
    question,
    loading,
    setLoading,
    error,
    handleAnswerOptionClick,
    showScore,
    setShowScore,
    currentQuestion,
    response,
    setResponse,
    setStart,
}) => {


  if (response === 1) {
    return <>
    <p>Not enough questions, please choose another category or difficulty</p>
    <button onClick={() => {setShowScore(true); setResponse(0); setStart(false); setLoading(true)}}>Try again</button></>
  }   else if (loading) {
      return <p>Loading...</p>;
     } else if (error) {
      return <p>Error: {error}</p>;

             } else {  
      return ( (showScore) ? <></> : 
        <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/10
              </div>
              <div className="question-text">
                {question && He.decode(question.results[currentQuestion].question)}
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