import React, { useState } from "react";
import Difficulty from "./Difficulty";
import Confirmation from "./Confirmation";
import Display from "./Display";
import Category from "./Category";

const Questions = () => {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState(null);

  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("10");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const [confirm, setConfirm] = useState(null);

  const questionsUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=boolean`;

  // https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=boolean


  //   Fetch Data
  const getQuestions = () => {
    fetch(questionsUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setQuestion(data);
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
     
  return (
    <div className="board">

      <Category setCategory={setCategory} />
      <Difficulty
      setDifficulty={setDifficulty}
      difficulty={difficulty}
      getNewQuestions={getNewQuestions}
      />
      
      <div className="question-section">      

      <Confirmation confirm={confirm}/>

      <Display
      question={question}
      loading={loading}
      error={error}
      handleAnswerOptionClick={handleAnswerOptionClick}
      getNewQuestions={getNewQuestions}
      showScore={showScore}
      score={score}
      totalScore={totalScore}
      currentQuestion={currentQuestion}
      responseCode={question.response_code}
      />

    </div>
    </div>
  );
};

export default Questions;
