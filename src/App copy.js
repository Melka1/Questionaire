import React from 'react';
import './App.css';
import Question from './components/Question'; 

function App() {
  const [quiz, setQuiz] = React.useState([])
  const [start, setStart] = React.useState(false)
  const [check, setCheck] = React.useState(false);
  const [right, setRight] = React.useState(0)
  
  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data=>setQuiz(data.results))
  }, [])

  function handleStart(){
    setStart(prev => !prev)
  }

  function handleCheck(){
    setCheck(true);
  }

  const questions = quiz.map((ques, index) => {
    
    let newArray = [ques.correct_answer, ...ques.incorrect_answers];
    let randArray = [];
    while(newArray.length>0){
      let rand = Math.floor(Math.random()*newArray.length)
      randArray.push({value:newArray[rand], chose:false, correct: newArray[rand]==ques.correct_answer?true:false})
      newArray.splice(rand, 1)
    }

    return (
    <Question answers= {randArray} question={ques.question} check={check} />
  )})
  
  return (
    <div className="App">
      { !start && <div className='intro'>
        <h1>Quizzical</h1>
        <p>Want to test your general knowledge!</p>
        <button onClick={handleStart}>Start Quiz</button>
      </div>}
      {start && questions}
      {start && <button onClick={handleCheck}>{!check?"Check Answers":"Retake the Quiz"}</button>}
    </div>
  );
}

export default App;
