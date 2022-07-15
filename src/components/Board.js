import React, { useState } from "react";
import Difficulty from "./Difficulty";
import Confirmation from "./Confirmation";
import Display from "./Display";
import Category from "./Category";
import Score from "./Score";

const Questions = () => {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(0);

  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("9");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const [confirm, setConfirm] = useState(null);

  const questionsUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=boolean`;

  // https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=boolean


  //   Fetch Data
  const getQuestions = () => {
    console.log(questionsUrl);
    fetch(questionsUrl)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setQuestion(data);
        setResponse(data.response_code);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getNewQuestions = () => {
    getQuestions();
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setConfirm(null);
    setStart(true);
  };

  //   Handle Answer

  const handleAnswerOptionClick = (isCorrect) => {
    const correctAnswer = question.results[currentQuestion].correct_answer;

    if (isCorrect === correctAnswer) {
      setScore(score + 1);
      setTotalScore(totalScore + 1);
      setConfirm(true);
    } else {
      setConfirm(false);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < question.results.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const quizSelector = (showScore) ?
      <div>
        <Category setCategory={setCategory} />
      <Difficulty
      setDifficulty={setDifficulty}
      difficulty={difficulty}
      getNewQuestions={getNewQuestions}
      />
      </div> : <></>;

const displayScore = (showScore && score > 0) ?  <Score score={score} totalScore={totalScore} /> : <></>;
  

  const startQuiz = (start) ?
  <Display
      question={question}
      setQuestion={setQuestion}
      loading={loading}
      setLoading={setLoading}
      error={error}
      handleAnswerOptionClick={handleAnswerOptionClick}
      getNewQuestions={getNewQuestions}
      setShowScore={setShowScore}
      currentQuestion={currentQuestion}
      response={response}
      setResponse={setResponse}
      setStart={setStart}
      />
      : (showScore ? <></> : <button onClick={() => {setShowScore(true)}}>Start Quiz</button>);

     
  return (
    <div className="board">

      {displayScore}

      {quizSelector}
      
      <div className="question-section">      

      <Confirmation confirm={confirm}/>

      {startQuiz}

    </div>
    </div>
  );
};

export default Questions;
