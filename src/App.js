import React from 'react';
import {parseEntities} from 'parse-entities'
import './App.css'

function App() {
  const [start, setStart] = React.useState(false)
  const [check, setCheck] = React.useState(false)
  const [question, setQuestion] = React.useState([])
  const [answers, setAnswers] = React.useState([])
  const [score, setScore] = React.useState(0)

  React.useEffect(()=>{
    setQuestion([])
    setAnswers([])
    if(start){fetch("https://opentdb.com/api.php?amount=10&category=17&type=multiple")
      .then(res => res.json())
      .then(data=>data.results.map(ques=>{
        setQuestion(prev=>[...prev, parseEntities(ques.question)])
        
        let array = [{value:parseEntities(ques.correct_answer),
                    chose:false,
                    correct:true}, ...ques.incorrect_answers.map(item=>({
                    value:parseEntities(item),
                    chose:false,
                    correct:false}))]
        let randArray = []
        while(array.length>0){
          let rand = Math.floor(Math.random()*array.length)
          randArray.push(array[rand])
          array.splice(rand, 1)
        }
        setAnswers(prev=>[...prev, randArray]) 
      }
      ))
  }}, [start])
  console.log(answers)

  function handleStart(){
    setScore(0)
    setCheck(false)
    setStart(prev=>!prev)
  }

  function handleCheck(){
    setCheck(prev=>!prev)
  }

  function handleChose(id1, id2){
    const anseLog = answers;
    anseLog[id1].map((item, index)=>{
      if(index===id2){
        item.chose = !anseLog[id1][id2].chose
      } else {
        item.chose = false
      }
    })
    
    setAnswers(anseLog)
    setAnswers(prev=>[...prev])
  }

  const questList = question.map((quest, index)=>(
    <div key={index} className='container question--box'>
      <div className='question'>
          <h2>{quest}</h2>
      </div>
      <div className="answers">            
                {!check?answers[index].map((ans, ansIndex)=>(
                    <button key={ansIndex} id={ans.chose?"chosen":""} onClick={()=>handleChose(index,ansIndex)}>{ans.value}</button>
                )):answers[index].map((ans, ansIndex)=>(
                    <button key={ansIndex} 
                            id={ans.chose&&!ans.correct?"wrong":!ans.chose&&ans.correct?"right":
                                ans.chose&&ans.correct?"right":""} onClick={()=>handleChose(index, ansIndex)}>{ans.value} 
                    </button> 
                ))} 
            </div>
      </div>
  ))

  function displayScore(){
    answers.map(val=>{
      val.map(value=>{
        if(value.chose===true&&value.correct===true){setScore(prev=>prev+1)}
      })
  })
  return score;
  }
  
  return (
    <div className="App">
      { !start && <div className='intro'>
        <h1>Quizzical</h1>
        <p>Want to test your general knowledge!</p>
        <button onClick={handleStart} >Start Quiz</button>
      </div>}
      {start && questList}
      {start && (!check?<div className='score--part'>
                          <button onClick={()=>{handleCheck();displayScore()}}>Check Answers</button>
                        </div>:
                        (<div className='score--part'>
                          <p className='score'>You scored {score}/{question.length} correct answers.</p>
                          <button onClick={handleStart}>Play Again</button>
                        </div> ))}
    </div>
  );
}

export default App;
